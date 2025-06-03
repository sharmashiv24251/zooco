import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db/prisma';


export async function POST(req: NextRequest) {
  try {
    // Clear existing data
    await prisma.reminder.deleteMany();
    await prisma.pet.deleteMany();

    // Pets
    const pet1 = await prisma.pet.create({
      data: {
        name: 'Tommy',
        breed: 'Golden Retriever',
        age: 4,
      },
    });

    const pet2 = await prisma.pet.create({
      data: {
        name: 'Bella',
        breed: 'Beagle',
        age: 2,
      },
    });

    // Reminders for Tommy
    await prisma.reminder.createMany({
      data: [
        {
          title: 'Morning Walk',
          note: '30 mins walk',
          time: '07:30',
          date: new Date(),
          frequency: 'daily',
          category: 'lifestyle',
          status: 'pending',
          petId: pet1.id,
        },
        {
          title: 'Vet Visit',
          note: 'Annual checkup',
          time: '11:00',
          date: new Date(),
          frequency: 'yearly',
          category: 'health',
          status: 'pending',
          petId: pet1.id,
        },
        {
          title: 'Play Time',
          note: 'Fetch the ball',
          time: '17:00',
          date: new Date(),
          frequency: 'daily',
          category: 'general',
          status: 'completed',
          petId: pet1.id,
        },
      ],
    });

    // Reminders for Bella
    await prisma.reminder.createMany({
      data: [
        {
          title: 'Grooming',
          note: 'Trim nails and fur',
          time: '09:00',
          date: new Date(),
          frequency: 'monthly',
          category: 'lifestyle',
          status: 'pending',
          petId: pet2.id,
        },
        {
          title: 'Dental Check',
          note: '',
          time: '13:00',
          date: new Date(),
          frequency: 'quarterly',
          category: 'health',
          status: 'pending',
          petId: pet2.id,
        },
        {
          title: 'Training',
          note: 'Basic commands',
          time: '16:00',
          date: new Date(),
          frequency: 'weekly',
          category: 'general',
          status: 'completed',
          petId: pet2.id,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'Database seeded with 2 pets and 6 reminders.',
    });
  } catch (error) {
    console.error('[SEED_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Failed to seed DB.' }, { status: 500 });
  }
}
