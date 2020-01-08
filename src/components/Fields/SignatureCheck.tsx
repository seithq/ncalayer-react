import React from "react"
import { CheckState } from "../../state"

interface SignatureCheckProps {
  message: string
  checkState: CheckState
}

const SignatureCheck: React.FC<SignatureCheckProps> = ({
  message,
  checkState,
}) => {
  var btnColor = ""
  switch (checkState) {
    case CheckState.NotValidated:
      btnColor = "text-orange-600 border-orange-600 bg-orange-200"
      break
    case CheckState.Failed:
      btnColor = "text-red-600 border-red-600 bg-red-200"
      break
    case CheckState.OK:
      btnColor = "text-green-600 border-green-600 bg-green-200"
      break
  }
  return (
    <span
      className={
        btnColor +
        " px-4 py-2 rounded-lg border border-solid border-2 text-center font-semibold"
      }
    >
      {message}
    </span>
  )
}

export default SignatureCheck
