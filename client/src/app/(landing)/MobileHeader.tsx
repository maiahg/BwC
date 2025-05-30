import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MobileHeader = ({}) => {
  const router = useRouter();

  return (
    <section className="w-full max-w-[264px]">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="bottom"
          className="!w-screen !max-w-none !left-0 !top-0 !h-screen !rounded-none p-6 bg-white z-50"
        >
          <DropdownMenuItem>
            <Button
              variant="outline"
              className="w-full py-6 form-btn-secondary"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="w-full py-6 form-btn"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default MobileHeader;
