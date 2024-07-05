import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

import { TbMinusVertical } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface SideBarButtonProps {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({
  isSidebarVisible,
  toggleSidebar,
}) => {
  return (
    <button
      className={cn(
        "hidden md:flex",
        "absolute top-1/2 left-2 transform -translate-y-1/2 items-center group text-foreground"
      )}
      onClick={toggleSidebar}
    >
      <TbMinusVertical className="text-2xl" />
      {isSidebarVisible ? (
        <IoArrowBackOutline className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      ) : (
        <IoArrowForwardOutline className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
};

export default SideBarButton;
