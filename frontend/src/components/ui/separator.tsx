import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { title?: string }
>(
  (
    { className, orientation = "horizontal", decorative = true, title, ...props },
    ref
  ) => (
    <div
      className={ cn(
        "relative flex items-center",
        orientation === "horizontal" ? "w-full" : "h-full flex-col"
      ) }
    >
      <SeparatorPrimitive.Root
        ref={ ref }
        decorative={ decorative }
        orientation={ orientation }
        className={ cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          title ? "relative" : "",
          className
        ) }
        { ...props }
      />
      { title && (
        <span
          className={ cn(
            "absolute bg-white px-2 text-sm text-muted-foreground",
            orientation === "horizontal" ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2"
          ) }
        >
          { title }
        </span>
      ) }
    </div>
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
