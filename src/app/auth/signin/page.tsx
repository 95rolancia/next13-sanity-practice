"use client";

import ColorButton from "@/components/ui/ColorButton";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SigninPage() {
  const params = useSearchParams();
  console.log(params.get("callbackUrl"));
  return (
    <ColorButton
      text="Sign In With Google"
      onClick={() =>
        signIn("google", { callbackUrl: params.get("callbackUrl") || "" })
      }
    />
  );
}
