// frontend/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root URL ("/") to the login page
  redirect("/login");
}
