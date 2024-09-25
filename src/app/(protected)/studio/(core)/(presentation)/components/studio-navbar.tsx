import {  Video } from "lucide-react";
import Image from "next/image";
import LogoDark from "@/public/Dark.svg";
import LogoLight from "@/public/light.svg";
import Link from "next/link";
import { Button } from "@/core/presentation/components/ui/button";

const StudioNavbar = () => {
  return (
    <header className="border-b  dark:border-[#444] dark:bg-[#141414] dark:text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-sm md:text-2xl font-bold cursor-pointer">
          <Link href="/">
            <Image
              src={LogoDark}
              className="hidden dark:block"
              alt="Koicaster"
              height={50}
              width={200}
            />
            <Image
              src={LogoLight}
              className="block dark:hidden"
              alt="Koicaster"
              height={50}
              width={200}
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="destructive">
          <Video className="w-5 h-5s mr-3" /> <span>Record</span>
        </Button>
      </div>
    </header>
  );
};

export default StudioNavbar;
