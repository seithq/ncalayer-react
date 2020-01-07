import React from "react"

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className={`
        px-4 py-2
        rounded bg-white
        border border-solid border-teal-700
        text-teal-700 font-semibold tracking-wider
        hover:bg-teal-700 hover:text-white
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
