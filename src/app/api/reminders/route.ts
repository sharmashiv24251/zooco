// app/api/reminders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db/prisma';

   export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const reminders = await prisma.reminder.findMany({
      include: {
        pet: true
      }
    });
    return NextResponse.json({ success: true, data: reminders });
  } catch (error) {
    console.error('[REMINDERS_GET_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reminders' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, note, petId, time, date, frequency, category, status } = body;

    if (!title || !petId || !time || !date || !frequency || !category || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const reminder = await prisma.reminder.create({
      data: {
        title,
        note: note || '',
        petId,
        time,
        date: new Date(date),
        frequency,
        category,
        status
      },
      include: { pet: true }
    });

    return NextResponse.json({ success: true, data: reminder });
  } catch (error) {
    console.error('[REMINDERS_POST_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create reminder' },
      { status: 500 }
    );
  }
}

// const { data, statusCode } = await fetchReminders();


