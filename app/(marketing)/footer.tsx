import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/bone.svg" 
            alt="Skeletal System" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Skeletal System
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/nerve.svg" 
            alt="Nervous System" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Nervous System
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/brain.svg" 
            alt="Organ System" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Organ System
        </Button>
      </div>
    </footer>
  );
};
