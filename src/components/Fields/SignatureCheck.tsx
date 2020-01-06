import React from "react"
import styled from "styled-components"

const StyledVerified = styled.span`
  color: green;
`

const StyledNotVerified = styled.span`
  color: red;
`

interface SignatureCheckProps {
  message: string
  verified: boolean
}

const SignatureCheck: React.FC<SignatureCheckProps> = ({
  message,
  verified,
}) => {
  if (!verified) {
    return <StyledNotVerified>{message}</StyledNotVerified>
  }

  return <StyledVerified>{message}</StyledVerified>
}

export default SignatureCheck
