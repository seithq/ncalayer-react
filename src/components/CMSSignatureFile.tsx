import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"

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
        cmsFileSignatureValid: false,
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
      <span>
        Введите путь к файлу для подписи{" "}
        <strong>(createCMSSignatureFromFile)</strong>
      </span>
      <br />
      <input type="text" readOnly value={state.cmsFilePath} />
      <input type="checkbox" onClick={handleCMSSignatureFromFileToggle} />{" "}
      Включить данные в подпись
      <br />
      <button onClick={handleCMSSignatureFromFileChoose}>
        Выбрать файл для подписания
      </button>
      <button onClick={handleCMSSignatureFromFileClick}>
        Подпиcать данные
      </button>
      <br />
      <span>
        Проверить подписанные данные{" "}
        <strong>(verifyCMSSignatureFromFile)</strong>
      </span>
      <br />
      <textarea readOnly value={state.cmsFileSignatureSigned} />
      <SignatureCheck
        verified={state.cmsFileSignatureValid}
        message={state.cmsFileSignatureMessage}
      />
      <br />
      <button onClick={handleCMSSignatureFromFileVerify}>
        Проверить данные
      </button>
    </div>
  )
}

export default CMSSignatureFile
