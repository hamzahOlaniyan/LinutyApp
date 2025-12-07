import { cn } from "@/lib/utils"; // OR your own cx/cn helper
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

// 1. Define button styles with cva
const buttonVariants = cva(
   "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
   {
      variants: {
         variant: {
            primary: "bg-blue-600 text-white hover:bg-blue-700",
            secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
            outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
            ghost: "text-gray-900 hover:bg-gray-100",
         },
         size: {
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-4 text-base",
            lg: "h-12 px-6 text-lg",
         },
         fullWidth: {
            true: "w-full",
            false: "",
         },
      },
      defaultVariants: {
         variant: "primary",
         size: "md",
         fullWidth: false,
      },
   }
);

// 2. Define props
export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   loading?: boolean;
   onPress?: () => void;
}

// 3. Button component
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, fullWidth, loading, children, ...props }, ref) => {
      return (
         <button
            ref={ref}
            disabled={loading || props.disabled}
            className={cn(buttonVariants({ variant, size, fullWidth }), className)}
            {...props}
         >
            {loading ? "Loading..." : children}
         </button>
      );
   }
);

Button.displayName = "Button";
