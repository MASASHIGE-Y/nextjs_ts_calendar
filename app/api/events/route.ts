import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.event.findMany();

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();

  const event = await prisma.event.create({
    data: {
      title: body.title,
      date: body.date,
    },
  });

  return NextResponse.json(event);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.event.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const body = await request.json();

  const event = await prisma.event.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
    },
  });

  return NextResponse.json(event);
}
