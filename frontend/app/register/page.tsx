"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Register() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login page which now handles registration
    router.push("/login");
  }, [router]);
  
  return null;
}
