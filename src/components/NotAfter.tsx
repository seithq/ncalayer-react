import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import Button from "./Fields/Button"
import Label from "./Fields/Label"
import Input from "./Fields/Input"
import Spacer from "./Fields/Spacer"

interface NotAfterProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const NotAfter: React.FC<NotAfterProps> = ({ client, state, setState }) => {
  const handleNotAfterClick = (
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
        method: client.GetNotAfter(
          state.alias,
          state.path,
          state.keyAlias,
          state.password
        ),
      })
    }
  }

  return (
    <div className="NotAfter">
      <Label method="getNotAfter">Время исхода действия сертификата</Label>
      <Input type="text" readOnly value={state.notAfter} />
      <Spacer point="2" />
      <Button onClick={handleNotAfterClick}>Узнать</Button>
    </div>
  )
}

export default NotAfter
