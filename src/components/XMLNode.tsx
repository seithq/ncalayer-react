import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"

interface XMLNodeProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const XMLNode: React.FC<XMLNodeProps> = ({ client, state, setState }) => {
  const handleXmlNodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, xmlNode: e.target.value })
  }

  const handleXmlNodeElementChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, xmlNodeElement: e.target.value })
  }

  const handleXmlNodeAttributeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, xmlNodeAttribute: e.target.value })
  }

  const handleXmlNodeParentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, xmlNodeParent: e.target.value })
  }

  const handleXmlNodeClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
      elementName: state.xmlNodeElement,
      attribute: state.xmlNodeAttribute,
    })
    if (ok) {
      setState({
        ...state,
        xmlNodeValid: false,
        xmlNodeMessage: "Не проверено",
        method: client.SignXmlByElementId(
          state.alias,
          state.path,
          state.keyAlias,
          state.password,
          state.xmlNode,
          state.xmlNodeElement,
          state.xmlNodeAttribute,
          state.xmlNodeParent
        ),
      })
    }
  }

  const handleXmlNodeVerifyAttributeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, xmlNodeVerifyAttribute: e.target.value })
  }

  const handleXmlNodeVerifyParentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, xmlNodeVerifyParent: e.target.value })
  }

  const handleXmlNodeVerify = (
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
        method: client.VerifyXmlByElementId(
          state.xmlNodeSigned,
          state.xmlNodeVerifyAttribute,
          state.xmlNodeVerifyParent
        ),
      })
    }
  }

  return (
    <div className="XMLNode">
      <span>
        Подписать XML по идентификатору элемента <strong>(signXMLById)</strong>
      </span>
      <br />
      <textarea
        onChange={handleXmlNodeChange}
        defaultValue={state.xmlNode}
        style={{ height: 200, width: 400 }}
      />
      <br />
      <label htmlFor="element">Подписываемый элемент XML:</label>
      <input type="text" id="element" onChange={handleXmlNodeElementChange} />
      <br />
      <label htmlFor="attr">Имя атрибута идентификации элемента XML:</label>
      <input type="text" id="attr" onChange={handleXmlNodeAttributeChange} />
      <br />
      <label htmlFor="parent">Верхний элемент для подписи:</label>
      <input type="text" id="parent" onChange={handleXmlNodeParentChange} />
      <br />
      <button onClick={handleXmlNodeClick}>Подпиcать данные</button>
      <br />
      <span>
        Проверить подписанный XML <strong>(verifyXml(String elemId))</strong>
      </span>
      <br />
      <textarea readOnly value={state.xmlNodeSigned} />
      <SignatureCheck
        verified={state.xmlNodeValid}
        message={state.xmlNodeMessage}
      />
      <br />
      <label htmlFor="v-attr">Имя атрибута идентификации элемента XML:</label>
      <input
        type="text"
        id="v-attr"
        onChange={handleXmlNodeVerifyAttributeChange}
      />
      <br />
      <label htmlFor="v-parent">Верхний элемент для подписи:</label>
      <input
        type="text"
        id="v-parent"
        onChange={handleXmlNodeVerifyParentChange}
      />
      <br />
      <button onClick={handleXmlNodeVerify}>Проверить данные</button>
    </div>
  )
}

export default XMLNode
