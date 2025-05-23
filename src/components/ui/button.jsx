import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "relative overflow-hidden", // Added for the hover effect
          {
            "bg-primary text-primary-foreground": variant === "default",
            "bg-destructive text-destructive-foreground": variant === "destructive",
            "border border-input bg-background hover:text-accent-foreground": variant === "outline",
            "bg-secondary text-secondary-foreground": variant === "secondary",
            "bg-transparent text-foreground underline-offset-4": variant === "link",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-9 w-9": size === "icon",
          },
          // Hover effects
          variant !== "link" ? "hover:text-primary-foreground" : "hover:underline",
          "before:content-[''] before:absolute before:top-full before:left-full before:w-0 before:h-0 before:bg-black/20 before:transition-all before:duration-300 before:ease-in-out before:transform before:-translate-x-1/2 before:-translate-y-1/2",
          "hover:before:w-[225%] hover:before:h-[225%] hover:before:top-0 hover:before:left-0 hover:before:translate-x-0 hover:before:translate-y-0",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }