import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserControllerProps {
  session: any;
}

const UserController: React.FC<UserControllerProps> = ({ session }) => {
  const router = useRouter();
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      toast.success("로그아웃 되었습니다.");
      signOut();
      router.push("/");
    }
  };
  return (
    <div className="border-t">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={session?.user?.image} alt="user" />
            <AvatarFallback>{session?.user?.name}</AvatarFallback>
          </Avatar>
          <span className="font-bold">{session?.user?.name}</span>
        </div>
        <FiLogOut
          className="hover:opacity-60 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default UserController;
