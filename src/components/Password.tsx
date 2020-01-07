import React from "react"
import AppState from "../state"

interface PasswordProps {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const Password: React.FC<PasswordProps> = ({ state, setState }) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value })
  }

  return (
    <div className="Password">
      <span>Пароль для хранилища:</span>
      <br />
      <input type="password" onChange={handlePasswordChange} />
    </div>
  )
}

export default Password
