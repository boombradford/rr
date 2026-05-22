import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../../lib/utils"

function Card({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="card"
      className={cn(
        "ui-card",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("ui-card-header", className)}
      {...props}
    />
  )
}

function CardTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"h3"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "h3"

  return (
    <Comp
      data-slot="card-title"
      className={cn("ui-card-title", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("ui-card-description", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("ui-card-content", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("ui-card-footer", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
