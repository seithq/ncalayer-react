import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"

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
      <span>
        Данные Удостоверяющего центра <strong>(getIssuerDN)</strong>
      </span>
      <br />
      <textarea readOnly value={state.issuerDN} />
      <button onClick={handleIssuerDNClick}>Узнать</button>
    </div>
  )
}

export default IssuerDN
