"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Login = async () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <div>
      <h1>Member Client Session</h1>
      <p>{session?.user?.email}</p>
    </div>
  );
};

export default Login