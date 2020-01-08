import React from "react"

type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

const TextArea: React.FC<TextAreaProps> = ({ ...props }) => {
  return (
    <textarea
      className="resize-none w-full h-48 px-4 py-2 shadow-lg rounded hover:bg-gray-100 outline-none"
      {...props}
    ></textarea>
  )
}

export default TextArea
