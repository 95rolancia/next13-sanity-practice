import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addComment } from "@/service/post";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  const { id, comment } = await req.json();

  if (id == null || comment == null) {
    throw new Response("Bad Reqeust", { status: 400 });
  }

  return addComment(id, user.id, comment)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
