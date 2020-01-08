import React from "react"
import AppState, { CheckState } from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"
import Button from "./Fields/Button"
import TextArea from "./Fields/TextArea"
import Label from "./Fields/Label"
import Spacer from "./Fields/Spacer"
import XMLCode from "./Fields/XMLCode"

interface XMLProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const XML: React.FC<XMLProps> = ({ client, state, setState }) => {
  const handleXmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, xml: e.target.value })
  }

  const handleXmlClick = (
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
        xmlValid: CheckState.NotValidated,
        xmlMessage: "Не проверено",
        method: client.SignXml(
          state.alias,
          state.path,
          state.keyAlias,
          state.password,
          state.xml
        ),
      })
    }
  }

  const handleXmlVerify = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      setState({ ...state, method: client.VerifyXml(state.xmlSigned) })
    }
  }

  return (
    <div className="XML">
      <Label method="signXML">XML для подписи</Label>
      <TextArea onChange={handleXmlChange} defaultValue={state.xml} />
      <Spacer point="4" />
      <Button onClick={handleXmlClick}>Подпиcать данные</Button>
      <Label method="verifyXml">Проверить подписанный XML</Label>
      <XMLCode data={state.xmlSigned} />
      <Spacer point="4" />
      <div className="flex flex-row justify-between">
        <Button onClick={handleXmlVerify}>Проверить данные</Button>
        <SignatureCheck
          checkState={state.xmlValid}
          message={state.xmlMessage}
        />
      </div>
    </div>
  )
}

export default XML
