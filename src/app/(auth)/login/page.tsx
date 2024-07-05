import LoginForm from "@/components/form/LoginForm";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  if (session) redirect("/");
  
  return (
    <LoginForm />
  );
}