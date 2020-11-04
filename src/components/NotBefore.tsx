import React from "react"
import AppState from "../state"
import Client, { Response } from "@seithq/ncalayer"
import { checkInputs, ValidationType, handleError } from "../helper"
import Button from "./Fields/Button"
import Label from "./Fields/Label"
import Input from "./Fields/Input"
import Spacer from "./Fields/Spacer"

interface NotBeforeProps {
  client: Client
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
      client.getNotBefore(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({
              ...state,
              method: client.method,
              notBefore: resp.getResult(),
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
    <div className="NotBefore">
      <Label method="getNotBefore">Время начала действия сертификата</Label>
      <Input type="text" readOnly value={state.notBefore} />
      <Spacer point="2" />
      <Button onClick={handleNotBeforeClick}>Узнать</Button>
    </div>
  )
}

export default NotBefore
