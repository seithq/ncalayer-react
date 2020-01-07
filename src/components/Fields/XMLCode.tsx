import React from "react"
import Highlight from "react-highlight.js"

interface XMLCodeProps {
  data: string
}

const XMLCode: React.FC<XMLCodeProps> = ({ data }) => {
  if (data) {
    return <Highlight language="xml">{data}</Highlight>
  }
  return <div className="h-48" style={{ backgroundColor: `#23262e` }}></div>
}

export default XMLCode
