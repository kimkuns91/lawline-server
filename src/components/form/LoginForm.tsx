"use client";

import { MdEmail, MdKey } from "react-icons/md";

import { Button } from "../ui/button";
import IconInput from "@/components/InputIcon";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const res = await signIn("credentials", {
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
        redirect: false,
      });

      if (res && res.status === 401) {
        console.log();
        toast.error(res.error);
      } else {
        toast.success("로그인 완료");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto mt-28 bg-white rounded-xl">
      <div
        className={cn("flex w-full max-w-[330px] mx-auto flex-col gap-4 py-20")}
      >
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/images/Logo.png"
            alt="LawLine Logo"
            width={200}
            height={80}
          />
        </Link>
        <p className="text-base font-semibold text-left leading-8 text-[#777]">
          로라인에서 법률 상담을 받아보세요.
        </p>
        <div className="mt-2">
          <button
            className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-[#FEE500] px-5 py-3 font-semibold text-slate-900"
            onClick={() =>
              signIn("kakao", { redirect: true, callbackUrl: "/" })
            }
          >
            <Image
              src={"/images/kakaoIcon.svg"}
              width={20}
              height={20}
              alt="kakaoIcon"
            />
            카카오로 1초 만에 시작하기
          </button>
        </div>
        <div>
          <p className="custom-border my-4 text-center text-[#919191]">
            또는 이메일로 로그인
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <IconInput
            icon={<MdEmail />}
            ref={emailRef}
            type="text"
            name="email"
            placeholder="이메일 주소를 입력해주세요"
          />
          <IconInput
            icon={<MdKey />}
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <Button type="submit" className="">
            로그인
          </Button>
          {/* <div className="flex justify-center">
            <Link
              href={"/changepassword"}
              className="border-b pb-1 transition-all ease-in-out hover:opacity-70 text-[#777]"
            >
              비밀번호 찾기
            </Link>
          </div> */}
        </form>
        <div className="flex gap-2 items-center justify-center bg-[#F7F7F5] py-4 rounded-md">
          <p className="text-base font-bold text-[#777]">로라인이 처음이에요</p>
          <p
            /* eslint-disable-next-line */
            className="text-blue-500 font-bold hover:opacity-70 cursor-pointer"
            onClick={() => {
              router.push("/regist");
            }}
          >
            가입하기
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
