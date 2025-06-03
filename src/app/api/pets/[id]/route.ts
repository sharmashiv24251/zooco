// app/api/pets/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db/prisma';


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: params.id },
      include: { reminders: true }
    });

    if (!pet) {
      return NextResponse.json(
        { success: false, error: 'Pet not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pet });
  } catch (error) {
    console.error('[PET_GET_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pet' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, breed, age } = body;

    const pet = await prisma.pet.update({
      where: { id: params.id },
      data: { name, breed, age },
      include: { reminders: true }
    });

    return NextResponse.json({ success: true, data: pet });
  } catch (error) {
    console.error('[PET_UPDATE_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update pet' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First delete all reminders associated with the pet
    await prisma.reminder.deleteMany({
      where: { petId: params.id }
    });

    // Then delete the pet
    await prisma.pet.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true, message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('[PET_DELETE_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete pet' },
      { status: 500 }
    );
  }
}

//const { data, statusCode } = await fetchPetById("pet-id");
