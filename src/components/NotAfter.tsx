import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"

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
      <span>
        Время исхода действия сертификата <strong>(getNotAfter)</strong>
      </span>
      <br />
      <input type="text" readOnly value={state.notAfter} />
      <button onClick={handleNotAfterClick}>Узнать</button>
    </div>
  )
}

export default NotAfter
