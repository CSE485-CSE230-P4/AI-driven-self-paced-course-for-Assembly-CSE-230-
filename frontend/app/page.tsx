"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login page which now has the welcome screen
    router.push("/login");
  }, [router]);
  
  return null;
}
