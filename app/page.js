"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/post");
  }, [router]); // Run only once when the component mounts

  return null; // Don't render anything while redirecting
}
