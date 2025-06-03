import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reminderId = await params.id;
    const reminder = await prisma.reminder.findUnique({
      where: { id: reminderId },
      include: { pet: true }
    });

    if (!reminder) {
      return NextResponse.json(
        { success: false, error: 'Reminder not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: reminder });
  } catch (error) {
    console.error('[REMINDER_GET_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reminder' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const reminderId = await  params.id;
  try {
    const body = await req.json();
    const { title, note, time, date, frequency, category, status } = body;

    const reminder = await prisma.reminder.update({
      where: { id:reminderId },
      data: {
        title,
        note,
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
    console.error('[REMINDER_UPDATE_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update reminder' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.reminder.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true, message: 'Reminder deleted successfully' });
  } catch (error) {
    console.error('[REMINDER_DELETE_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete reminder' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const reminderId = await params.id;
  try {
    const body = await req.json();
    const { status } = body;

    const reminder = await prisma.reminder.update({
      where: { id: reminderId },
      data: { status },
      include: { pet: true }
    });

    return NextResponse.json({ success: true, data: reminder });
  } catch (error) {
    console.error('[REMINDER_STATUS_UPDATE_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update reminder status' },
      { status: 500 }
    );
  }
}

// const { data, statusCode } = await fetchReminderById("reminder-id");

// This ensures that the route is always fresh and does not use cached data.
