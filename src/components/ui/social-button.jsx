import * as React from "react"
import { cn } from "../../lib/utils"
import { Slot } from "@radix-ui/react-slot"

const SocialButton = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-white text-black border border-gray-300 hover:bg-gray-100": variant === "outline",
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
            "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "bg-transparent text-foreground underline-offset-4 hover:underline": variant === "link",
            "bg-[#4285F4] text-white hover:bg-[#4285F4]/90": variant === "google",
            "bg-[#24292F] text-white hover:bg-[#24292F]/90": variant === "github",
            "bg-[#1877F2] text-white hover:bg-[#1877F2]/90": variant === "facebook",
            "bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90": variant === "twitter",
            "bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90": variant === "linkedin",
            "bg-[#25D366] text-white hover:bg-[#25D366]/90": variant === "whatsapp",
            "bg-[#EA4335] text-white hover:bg-[#EA4335]/90": variant === "youtube",
            "bg-[#FF4500] text-white hover:bg-[#FF4500]/90": variant === "reddit",
            "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90": variant === "gradient",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
SocialButton.displayName = "SocialButton"

export { SocialButton }
