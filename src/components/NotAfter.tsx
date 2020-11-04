import React from "react"
import AppState from "../state"
import Client, { Response } from "@seithq/ncalayer"
import { checkInputs, ValidationType, handleError } from "../helper"
import Button from "./Fields/Button"
import Label from "./Fields/Label"
import Input from "./Fields/Input"
import Spacer from "./Fields/Spacer"

interface NotAfterProps {
  client: Client
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
      client.getNotAfter(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({
              ...state,
              method: client.method,
              notAfter: resp.getResult(),
            })

            return
          }

          handleError(
            resp,
            ValidationType.Password && ValidationType.PasswordAttemps
          )
        }
      )
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
