import { NextRequest, NextResponse } from "next/server";
import { getExecution } from "@defer/client";
import generateGitHubProfile from "@/defer/generateGitHubProfile";

export async function POST(
  _request: NextRequest,
  { params }: { params: { usernameOrExecId: string } }
) {
  const resp = await generateGitHubProfile(params.usernameOrExecId);
  return NextResponse.json(resp);
}

export async function GET(
  _request: Request,
  { params }: { params: { usernameOrExecId: string } }
) {
  const ret = await getExecution(params.usernameOrExecId);
  return NextResponse.json(ret);
}
