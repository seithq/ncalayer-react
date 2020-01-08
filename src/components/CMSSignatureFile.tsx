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

interface CMSSignatureFileProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const CMSSignatureFile: React.FC<CMSSignatureFileProps> = ({
  client,
  state,
  setState,
}) => {
  const handleCMSSignatureFromFileChoose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState({ ...state, method: client.ShowFileChooser("ALL", "") })
  }

  const handleCMSSignatureFromFileToggle = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setState({ ...state, cmsFileSignatureFlag: e.currentTarget.checked })
  }

  const handleCMSSignatureFromFileClick = (
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
        cmsFileSignatureValid: CheckState.NotValidated,
        cmsFileSignatureMessage: "Не проверено",
        method: client.CreateCMSSignatureFromFile(
          state.alias,
          state.path,
          state.keyAlias,
          state.password,
          state.cmsFilePath,
          state.cmsFileSignatureFlag
        ),
      })
    }
  }

  const handleCMSSignatureFromFileVerify = (
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
        method: client.VerifyCMSSignatureFromFile(
          state.cmsFileSignatureSigned,
          state.cmsFilePath
        ),
      })
    }
  }

  return (
    <div className="CMSSignatureFile">
      <Label method="createCMSSignatureFromFile">
        Путь к файлу для подписи
      </Label>
      <Input type="text" readOnly value={state.cmsFilePath} />
      <Spacer point="4" />
      <Button onClick={handleCMSSignatureFromFileChoose}>Выбрать файл</Button>
      <Spacer point="2" />
      <div className="flex flex-row justify-between">
        <Button onClick={handleCMSSignatureFromFileClick}>
          Подпиcать данные
        </Button>
        <CheckBox
          onClick={handleCMSSignatureFromFileToggle}
          text="Включить данные в подпись"
        />
      </div>
      <Label method="verifyCMSSignatureFromFile">Проверить данные</Label>
      <TextArea readOnly value={state.cmsFileSignatureSigned} />
      <Spacer point="4" />
      <div className="flex flex-row justify-between">
        <Button onClick={handleCMSSignatureFromFileVerify}>
          Проверить данные
        </Button>
        <SignatureCheck
          checkState={state.cmsFileSignatureValid}
          message={state.cmsFileSignatureMessage}
        />
      </div>
    </div>
  )
}

export default CMSSignatureFile
