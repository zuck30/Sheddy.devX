import * as React from "react"
import { cn } from "@/lib/utils"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

export { GlassCard }