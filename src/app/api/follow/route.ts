import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { follow, unfollow } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  const { id, follow: isFollow } = await req.json();

  if (id == null || follow == null) {
    throw new Response("Bad request", { status: 400 });
  }

  const request = isFollow ? unfollow : follow;

  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
