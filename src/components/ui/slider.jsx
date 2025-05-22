"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

const Slider = React.forwardRef(
  ({ className, min = 0, max = 100, step = 1, value, onChange, onValueChange, ...props }, ref) => {
    const handleChange = (e) => {
      const newValue = Number(e.target.value)
      if (onChange) onChange(e)
      if (onValueChange) onValueChange(newValue)
    }

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          className={cn(
            "w-full h-2 appearance-none bg-secondary rounded-full overflow-hidden",
            "range-input", // For custom styling
          )}
          onChange={handleChange}
          {...props}
        />
        <style jsx global>{`
          .range-input::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: none;
            box-shadow: 0 0 0 4px hsl(var(--background));
          }
          .range-input::-moz-range-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: none;
            box-shadow: 0 0 0 4px hsl(var(--background));
          }
          .range-input:focus {
            outline: none;
          }
          .range-input:focus::-webkit-slider-thumb {
            box-shadow: 0 0 0 4px hsl(var(--background)), 0 0 0 6px hsl(var(--ring));
          }
          .range-input:focus::-moz-range-thumb {
            box-shadow: 0 0 0 4px hsl(var(--background)), 0 0 0 6px hsl(var(--ring));
          }
        `}</style>
      </div>
    )
  },
)

Slider.displayName = "Slider"

export { Slider }
