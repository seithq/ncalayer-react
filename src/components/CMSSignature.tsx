import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"
import Button from "./Fields/Button"

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
        cmsSignatureValid: false,
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
      <span>
        Введите данные для подписи <strong>(createCMSSignature)</strong>
      </span>
      <br />
      <input type="text" onChange={handleCMSSignatureChange} />
      <input type="checkbox" onClick={handleCMSSignatureToggle} /> Включить
      данные в подпись
      <br />
      <Button onClick={handleCMSSignatureClick}>Подпиcать данные</Button>
      <br />
      <span>
        Проверить подписанные данные <strong>(verifyCMSSignature)</strong>
      </span>
      <br />
      <textarea readOnly value={state.cmsSignatureSigned} />
      <SignatureCheck
        verified={state.cmsSignatureValid}
        message={state.cmsSignatureMessage}
      />
      <br />
      <Button onClick={handleCMSSignatureVerify}>Проверить данные</Button>
    </div>
  )
}

export default CMSSignature
