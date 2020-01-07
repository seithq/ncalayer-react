import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import Button from "./Fields/Button"
import Label from "./Fields/Label"
import Spacer from "./Fields/Spacer"
import Input from "./Fields/Input"

interface IssuerDNProps {
  client: NCALayer
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
      setState({
        ...state,
        method: client.GetIssuerDN(
          state.alias,
          state.path,
          state.keyAlias,
          state.password
        ),
      })
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
