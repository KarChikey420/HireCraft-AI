import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[2px] border px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
        secondary: "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300",
        destructive: "border-red-500/20 bg-red-500/10 text-red-500 hover:border-red-500/30",
        outline: "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
