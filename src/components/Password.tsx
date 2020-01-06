import React from "react"

interface PasswordProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Password: React.FC<PasswordProps> = ({ onChange }) => {
  return (
    <div className="Password">
      <span>Пароль для хранилища:</span>
      <br />
      <input type="password" onChange={onChange} />
    </div>
  )
}

export default Password
