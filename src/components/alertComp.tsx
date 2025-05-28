import { Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertComp({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Alert className="gap-2 fixed z-50 w-100 top-[10%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
      <div className="animate-spin text-red-500">
        <Loader size={24} />
      </div>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
