import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface AboutDialogProps {
  buttonName: string;
  title: string;
  description1: string;
  description2: string;
  icon: React.ReactNode;
}

export function AboutDialog({
  buttonName,
  title,
  description1,
  description2,
  icon,
}: AboutDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full gap-3 border-l-1 px-2 py-1 rounded-r-lg text-white hover:cursor-pointer hover:bg-[#3a3c44]">
        {icon}
        {buttonName}
      </DialogTrigger>
      <DialogContent className="flex bg-[#2d2f37] text-white w-100 lg:w-200 rounded-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl lg:text-3xl">{title}</DialogTitle>
          <DialogDescription className="text-sm md:text-md lg:text-lg text-justify indent-6">
            {description1}
          </DialogDescription>
          <DialogDescription className="text-sm md:text-md lg:text-lg text-justify indent-6 mt-0">
            {description2}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
