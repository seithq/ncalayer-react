import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"

interface SubjectDNProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const SubjectDN: React.FC<SubjectDNProps> = ({ client, state, setState }) => {
  const handleSubjectDNClick = (
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
        method: client.GetSubjectDN(
          state.alias,
          state.path,
          state.keyAlias,
          state.password
        ),
      })
    }
  }

  return (
    <div className="SubjectDN">
      <span>
        Данные субъекта <strong>(getSubjectDN)</strong>
      </span>
      <br />
      <textarea readOnly value={state.subjectDN} />
      <button onClick={handleSubjectDNClick}>Узнать</button>
    </div>
  )
}

export default SubjectDN
