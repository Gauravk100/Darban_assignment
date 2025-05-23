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
          "relative overflow-hidden group",
          {
            "bg-white text-black border border-gray-300 dark:bg-slate-800 dark:text-white dark:border-slate-600":
              variant === "outline",
            "bg-primary text-primary-foreground": variant === "default",
            "bg-destructive text-destructive-foreground": variant === "destructive",
            "bg-secondary text-secondary-foreground": variant === "secondary",
            "bg-transparent text-foreground underline-offset-4 hover:underline": variant === "link",
            "bg-[#4285F4] text-white dark:bg-[#3367D6]": variant === "google",
            "bg-[#24292F] text-white dark:bg-[#1a1e22]": variant === "github",
            "bg-[#1877F2] text-white dark:bg-[#166FE5]": variant === "facebook",
            "bg-[#1DA1F2] text-white dark:bg-[#1A91DA]": variant === "twitter",
            "bg-[#0A66C2] text-white dark:bg-[#0958A5]": variant === "linkedin",
            "bg-[#25D366] text-white dark:bg-[#22C55E]": variant === "whatsapp",
            "bg-[#EA4335] text-white dark:bg-[#DC2626]": variant === "youtube",
            "bg-[#FF4500] text-white dark:bg-[#EA580C]": variant === "reddit",
            "bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-white":
              variant === "gradient",
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
        <span className="relative z-10 flex items-center justify-center">{children}</span>
        <span
          className={cn("absolute left-0 right-0 bottom-0 h-0 transition-all duration-300 group-hover:h-full z-0", {
            "bg-gray-100 dark:bg-slate-700": variant === "outline",
            "bg-primary/90": variant === "default",
            "bg-destructive/90": variant === "destructive",
            "bg-secondary/80": variant === "secondary",
            "bg-transparent": variant === "link",
            "bg-[#4285F4]/90 dark:bg-[#3367D6]/90": variant === "google",
            "bg-[#24292F]/90 dark:bg-[#1a1e22]/90": variant === "github",
            "bg-[#1877F2]/90 dark:bg-[#166FE5]/90": variant === "facebook",
            "bg-[#1DA1F2]/90 dark:bg-[#1A91DA]/90": variant === "twitter",
            "bg-[#0A66C2]/90 dark:bg-[#0958A5]/90": variant === "linkedin",
            "bg-[#25D366]/90 dark:bg-[#22C55E]/90": variant === "whatsapp",
            "bg-[#EA4335]/90 dark:bg-[#DC2626]/90": variant === "youtube",
            "bg-[#FF4500]/90 dark:bg-[#EA580C]/90": variant === "reddit",
            "bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500":
              variant === "gradient",
          })}
        />
      </Comp>
    )
  },
)
SocialButton.displayName = "SocialButton"

export { SocialButton }
