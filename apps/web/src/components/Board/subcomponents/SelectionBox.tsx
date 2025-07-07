import { ForwardedRef, forwardRef } from 'react'

export const SelectionBox = forwardRef(
  function SelectionBox (_props, ref: ForwardedRef<HTMLDivElement>) {
    return (
      <div
        id="selection-box"
        ref={ref}
        className="absolute pointer-events-none border-dashed border border-gray-500 bg-blue-100 opacity-50"
        style={{ display: 'none' }}
      />
    )
  }
)
