import { Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertComp({
  description,
}: {
  description: string;
}) {
  return (
    <Alert className="gap-2 fixed z-50 w-80 md:w-100 top-[10%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
      <AlertTitle>
        <Loader className="animate-spin text-red-500"/>
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
