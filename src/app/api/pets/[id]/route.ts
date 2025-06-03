// app/api/pets/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db/prisma';

   export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const {id: petId} = await params;
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
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
  const petId = await params.id;
  try {
    const body = await req.json();
    const { name, breed, age } = body;

    const pet = await prisma.pet.update({
      where: { id:petId },
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

  const {id: petId} = await params
  try {
    // First delete all reminders associated with the pet
    await prisma.reminder.deleteMany({
      where: { petId}
    });

    // Then delete the pet
    await prisma.pet.delete({
      where: { id: petId}
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

