import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import Button from "./Fields/Button"
import Label from "./Fields/Label"
import Input from "./Fields/Input"
import Spacer from "./Fields/Spacer"

interface NotBeforeProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const NotBefore: React.FC<NotBeforeProps> = ({ client, state, setState }) => {
  const handleNotBeforeClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      setState({
        ...state,
        method: client.GetNotBefore(
          state.alias,
          state.path,
          state.keyAlias,
          state.password
        ),
      })
    }
  }

  return (
    <div className="NotBefore">
      <Label method="getNotBefore">Время начала действия сертификата</Label>
      <Input type="text" readOnly value={state.notBefore} />
      <Spacer point="2" />
      <Button onClick={handleNotBeforeClick}>Узнать</Button>
    </div>
  )
}

export default NotBefore
