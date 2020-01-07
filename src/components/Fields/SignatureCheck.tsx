import React from "react"

interface SignatureCheckProps {
  message: string
  verified: boolean
}

const SignatureCheck: React.FC<SignatureCheckProps> = ({
  message,
  verified,
}) => {
  return <span style={{ color: verified ? "green" : "red" }}>{message}</span>
}

export default SignatureCheck
