import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"

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
      <span>
        Время начала действия сертификата <strong>(getNotBefore)</strong>
      </span>
      <br />
      <input type="text" readOnly value={state.notBefore} />
      <button onClick={handleNotBeforeClick}>Узнать</button>
    </div>
  )
}

export default NotBefore
