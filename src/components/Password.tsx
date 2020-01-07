import React from "react"
import AppState from "../state"
import Label from "./Fields/Label"
import Input from "./Fields/Input"

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
      <Label>Пароль для хранилища</Label>
      <Input type="password" onChange={handlePasswordChange} />
    </div>
  )
}

export default Password
