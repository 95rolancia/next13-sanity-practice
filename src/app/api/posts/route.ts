import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getFollowingPostOf, uploadPost } from "@/service/post";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getFollowingPostOf(user.username).then((data) =>
    NextResponse.json(data)
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await req.formData();
  const text = form.get("text")?.toString();
  const file = form.get("file") as Blob;

  if (text == null || file == null) {
    return new Response("Bad Request", { status: 400 });
  }

  return uploadPost(user.id, text, file).then((data) =>
    NextResponse.json(data)
  );
}
