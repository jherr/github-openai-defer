import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: { usernameOrExecId: string } }
) {
  return NextResponse.json({});
}

export async function GET(
  _request: Request,
  { params }: { params: { usernameOrExecId: string } }
) {
  return NextResponse.json({});
}
