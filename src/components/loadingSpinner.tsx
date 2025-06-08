import { Loader2Icon } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-white/95">
      <Loader2Icon className="h-10 w-10 animate-spin text-amber-600" />
    </div>
  );
}
