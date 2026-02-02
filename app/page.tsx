import { redirect } from "next/navigation";

export default function RootPage() {
  // Assume user is authenticated and redirect to dashboard
  redirect("/dashboard");
}
