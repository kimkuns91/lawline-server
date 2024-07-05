import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface LoginButtonProps {
  status: any;
}
const LoginButton: React.FC<LoginButtonProps> = ({ status }) => {
  console.log("status:", status);
  if (status === "loading") {
    return;
  }

  if (status === "unauthenticated") {
    return (
      <div className={cn("flex w-full px-6 py-8")}>
        <Link
          className={cn(
            "w-full flex justify-center items-center rounded bg-[#40ab55] text-white py-2",
            "hover:opacity-70"
          )}
          href="/login"
        >
          로그인
        </Link>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className={cn("flex w-full px-6 py-8")}>
        <button
          className={cn(
            "w-full flex justify-center items-center rounded bg-[#40ab55] text-white py-2",
            "hover:opacity-70"
          )}
          onClick={() => {
            signOut();
          }}
        >
          로그아웃
        </button>
      </div>
    );
  }
};

export default LoginButton;
