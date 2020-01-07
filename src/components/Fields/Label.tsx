import React from "react"

interface LabelProps {
  method?: string
}

const Label: React.FC<LabelProps> = ({ method, children }) => {
  return (
    <div className="my-2">
      <span className="text-lg text-gray-700 font-semibold tracking-wider">
        {children}
        {method && <span className="font-extrabold">{` (${method})`}</span>}
      </span>
    </div>
  )
}

export default Label
