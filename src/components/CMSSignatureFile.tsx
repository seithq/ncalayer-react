import React from "react"
import AppState, { CheckState } from "../state"
import Client, { Response } from "@seithq/ncalayer"
import { checkInputs, ValidationType, handleError } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"
import Button from "./Fields/Button"
import Input from "./Fields/Input"
import TextArea from "./Fields/TextArea"
import Label from "./Fields/Label"
import Spacer from "./Fields/Spacer"
import CheckBox from "./Fields/CheckBox"

interface CMSSignatureFileProps {
  client: Client
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
    client.showFileChooser("ALL", "", (resp: Response) => {
      setState({
        ...state,
        method: client.method,
        cmsFilePath: resp.getResult(),
      })
    })
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
      client.createCMSSignatureFromFile(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        state.cmsFilePath,
        state.cmsFileSignatureFlag,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({
              ...state,
              method: client.method,
              cmsFileSignatureSigned: resp.getResult(),
              cmsFileSignatureValid: CheckState.NotValidated,
              cmsFileSignatureMessage: "Не проверено",
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
      client.verifyCMSSignatureFromFile(
        state.cmsFilePath,
        state.cmsFileSignatureSigned,
        (resp: Response) => {
          if (resp.isOk()) {
            if (!resp.getResult()) {
              setState({
                ...state,
                method: client.method,
                cmsFileSignatureValid: CheckState.Failed,
                cmsFileSignatureMessage: "Неправильная подпись",
              })

              return
            }

            setState({
              ...state,
              method: client.method,
              cmsFileSignatureValid: CheckState.OK,
              cmsFileSignatureMessage: "Валидная подпись",
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
