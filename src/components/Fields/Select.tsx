import React from "react"

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select {...props} className="appearance-none w-full px-4 py-2 shadow-lg">
      {children}
    </select>
  )
}

export default Select
