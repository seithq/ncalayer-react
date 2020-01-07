import React from "react"

interface SpacerProps {
  point: string
}

const Spacer: React.FC<SpacerProps> = ({ point }) => {
  return <div className={"mt-" + point}></div>
}

export default Spacer
