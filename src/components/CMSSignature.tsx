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
import CheckBox from "./Fields/CheckBox"

interface CMSSignatureProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const CMSSignature: React.FC<CMSSignatureProps> = ({
  client,
  state,
  setState,
}) => {
  const handleCMSSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, cmsSignature: e.target.value })
  }

  const handleCMSSignatureToggle = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setState({ ...state, cmsSignatureFlag: e.currentTarget.checked })
  }

  const handleCMSSignatureClick = (
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
        cmsSignatureValid: CheckState.NotValidated,
        cmsSignatureMessage: "Не проверено",
        method: client.CreateCMSSignature(
          state.alias,
          state.path,
          state.keyAlias,
          state.password,
          state.cmsSignature,
          state.cmsSignatureFlag
        ),
      })
    }
  }

  const handleCMSSignatureVerify = (
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
        method: client.VerifyCMSSignature(
          state.cmsSignatureSigned,
          state.cmsSignature
        ),
      })
    }
  }

  return (
    <div className="CMSSignature">
      <Label method="createCMSSignature">Введите данные для подписи</Label>
      <Input type="text" onChange={handleCMSSignatureChange} />
      <Spacer point="4" />
      <div className="flex flex-row justify-between">
        <Button onClick={handleCMSSignatureClick}>Подпиcать данные</Button>
        <CheckBox
          onClick={handleCMSSignatureToggle}
          text="Включить данные в подпись"
        />
      </div>
      <Label method="verifyCMSSignature">Проверить подписанные данные</Label>
      <TextArea readOnly value={state.cmsSignatureSigned} />
      <Spacer point="4" />
      <div className="flex flex-row justify-between">
        <Button onClick={handleCMSSignatureVerify}>Проверить данные</Button>
        <SignatureCheck
          checkState={state.cmsSignatureValid}
          message={state.cmsSignatureMessage}
        />
      </div>
    </div>
  )
}

export default CMSSignature
