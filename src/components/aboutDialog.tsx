import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AboutDialogProps {
  buttonName: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function AboutDialog({
  buttonName,
  title,
  description,
  icon
}: AboutDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full gap-3 border-l-1 px-2 py-1 text-white hover:cursor-pointer">
        {icon}
        {buttonName}
      </DialogTrigger>
      <DialogContent className="bg-[#2d2f37] text-white w-200 rounded-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl lg:text-3xl">{title}</DialogTitle>
          <DialogDescription className="text-sm md:text-md lg:text-lg text-justify">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
