import React from "react"

interface Props {
  text: string
}

type CheckBoxProps = Props &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const CheckBox: React.FC<CheckBoxProps> = ({ text, ...props }) => {
  return (
    <label className="flex items-center font-semibold text-gray-600">
      <input type="checkbox" className="mr-2 leading-wider" {...props} />
      <span className="text-base">{text}</span>
    </label>
  )
}

export default CheckBox
