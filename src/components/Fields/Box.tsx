import React from "react"

const Box: React.FC = ({ children }) => {
  return (
    <div className="bg-gray-200 rounded px-4 py-4 mb-4 shadow-md">
      {children}
    </div>
  )
}

export default Box
