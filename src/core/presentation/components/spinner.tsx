import { Loader } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/core/infrastructure/lib/utils";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      small: "h-2 w-2",
      large: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};
