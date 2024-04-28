import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { courses } from "@/db/schema";

export const GET = async () => {
  // Only admin can fetch data
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.courses.findMany();

  // return response json
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  // only admin can post data
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // await request
  const body = await req.json();

  // insert courses into the database and return
  const data = await db.insert(courses).values({
    ...body,
  }).returning();

  // return response json
  return NextResponse.json(data[0]);
};
