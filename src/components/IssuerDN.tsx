import React from "react"
import AppState from "../state"
import Client, { Response } from "@seithq/ncalayer"
import { checkInputs, ValidationType, handleError } from "../helper"
import Button from "./Fields/Button"
import Label from "./Fields/Label"
import Spacer from "./Fields/Spacer"
import Input from "./Fields/Input"

interface IssuerDNProps {
  client: Client
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const IssuerDN: React.FC<IssuerDNProps> = ({ client, state, setState }) => {
  const handleIssuerDNClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      client.getIssuerDN(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({
              ...state,
              method: client.method,
              issuerDN: resp.getResult(),
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
    <div className="IssuerDN">
      <Label method="getIssuerDN">Данные Удостоверяющего центра</Label>
      <Input readOnly value={state.issuerDN} />
      <Spacer point="2" />
      <Button onClick={handleIssuerDNClick}>Узнать</Button>
    </div>
  )
}

export default IssuerDN
