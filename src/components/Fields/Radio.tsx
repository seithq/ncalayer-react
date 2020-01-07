import React from "react"

interface RadioProps {
  key: string
  text: string
  active: boolean
  onChange: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Radio: React.FC<RadioProps> = ({ key, text, active, onChange }) => {
  return (
    <div
      key={key}
      className={
        `
        mr-2 px-4 py-2
        rounded-full
        border border-solid border-teal-700
        font-semibold tracking-wider
        hover:bg-teal-700 hover:text-white
        ` + (active ? " bg-teal-700 text-white" : " bg-white text-teal-700")
      }
      onClick={onChange}
    >
      {text}
    </div>
  )
}

export default Radio
