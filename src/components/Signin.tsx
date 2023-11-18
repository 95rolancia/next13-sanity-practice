"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";
import { useParams, useSearchParams } from "next/navigation";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};
export default function Signin({ providers, callbackUrl }: Props) {
  const params = useParams();
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={id}
          onClick={() => signIn(id, { callbackUrl })}
          text={`Sign In with ${name}`}
          size="big"
        />
      ))}
    </>
  );
}
