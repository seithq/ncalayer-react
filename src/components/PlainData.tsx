import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"
import Button from "./Fields/Button"

interface PlainDataProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const PlainData: React.FC<PlainDataProps> = ({ client, state, setState }) => {
  const handlePlainDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, plainData: e.target.value })
  }

  const handlePlainDataClick = (
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
        plainDataValid: false,
        plainDataMessage: "Не проверено",
        method: client.SignPlainData(
          state.alias,
          state.path,
          state.keyAlias,
          state.password,
          state.plainData
        ),
      })
    }
  }

  const handlePlainDataVerify = (
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
        method: client.VerifyPlainData(
          state.alias,
          state.path,
          state.keyAlias,
          state.password,
          state.plainData,
          state.plainDataSigned
        ),
      })
    }
  }

  return (
    <div className="PlainData">
      <span>
        Введите данные для подписи <strong>(signPlainData)</strong>
      </span>
      <br />
      <input type="text" onChange={handlePlainDataChange} />
      <Button onClick={handlePlainDataClick}>Подпиcать данные</Button>
      <br />
      <span>
        Проверить подписанные данные <strong>(verifyPlainData)</strong>
      </span>
      <br />
      <textarea readOnly value={state.plainDataSigned} />
      <SignatureCheck
        verified={state.plainDataValid}
        message={state.plainDataMessage}
      />
      <br />
      <Button onClick={handlePlainDataVerify}>Проверить данные</Button>
    </div>
  )
}

export default PlainData
