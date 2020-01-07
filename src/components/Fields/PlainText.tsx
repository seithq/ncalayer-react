import React from "react"
import Highlight from "react-highlight.js"

interface PlainTextProps {
  data: string
}

const PlainText: React.FC<PlainTextProps> = ({ data }) => {
  if (data) {
    return <Highlight language="plaintext">{data}</Highlight>
  }
  return <Highlight language="plaintext">...</Highlight>
}

export default PlainText
