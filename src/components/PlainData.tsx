import React from "react"
import AppState, { CheckState } from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"
import Button from "./Fields/Button"
import Input from "./Fields/Input"
import TextArea from "./Fields/TextArea"
import Label from "./Fields/Label"
import Spacer from "./Fields/Spacer"

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
        plainDataValid: CheckState.NotValidated,
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
      <Label method="signPlainData">Введите данные для подписи</Label>
      <Input type="text" onChange={handlePlainDataChange} />
      <Spacer point="4" />
      <Button onClick={handlePlainDataClick}>Подпиcать данные</Button>
      <Label method="verifyPlainData">Проверить подписанные данные</Label>
      <TextArea readOnly value={state.plainDataSigned} />
      <Spacer point="4" />
      <div className="flex flex-row justify-between">
        <Button onClick={handlePlainDataVerify}>Проверить данные</Button>
        <SignatureCheck
          checkState={state.plainDataValid}
          message={state.plainDataMessage}
        />
      </div>
    </div>
  )
}

export default PlainData
