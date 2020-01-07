import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"
import Button from "./Fields/Button"
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
        xmlValid: false,
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
      <span>
        XML для подписи <strong>(signXML)</strong>
      </span>
      <br />
      <textarea
        onChange={handleXmlChange}
        defaultValue={state.xml}
        style={{ height: 100, width: 200 }}
      />
      <Button onClick={handleXmlClick}>Подпиcать данные</Button>
      <br />
      <span>
        Проверить подписанный XML <strong>(verifyXml)</strong>
      </span>
      <br />
      <XMLCode data={state.xmlSigned} />
      <SignatureCheck verified={state.xmlValid} message={state.xmlMessage} />
      <br />
      <Button onClick={handleXmlVerify}>Проверить данные</Button>
    </div>
  )
}

export default XML
