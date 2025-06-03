// app/api/pets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db/prisma';


export async function GET() {
  try {
    const pets = await prisma.pet.findMany({
      include: {
        reminders: true
      }
    });
    return NextResponse.json({ success: true, data: pets });
  } catch (error) {
    console.error('[PETS_GET_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pets' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, breed, age } = body;

    if (!name || !breed || !age) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pet = await prisma.pet.create({
      data: { name, breed, age },
      include: { reminders: true }
    });

    return NextResponse.json({ success: true, data: pet });
  } catch (error) {
    console.error('[PETS_POST_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create pet' },
      { status: 500 }
    );
  }
}

// const { data, statusCode } = await fetchPets();

export const revalidate = 0;
