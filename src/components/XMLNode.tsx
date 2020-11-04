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
import XMLCode from "./Fields/XMLCode"

interface XMLNodeProps {
  client: Client
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
      client.signXmlByElementId(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        state.xmlNode,
        state.xmlNodeElement,
        state.xmlNodeAttribute,
        state.xmlNodeParent,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({
              ...state,
              method: client.method,
              xmlNodeSigned: resp.getResult(),
              xmlNodeValid: CheckState.NotValidated,
              xmlNodeMessage: "Не проверено",
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
      client.verifyXmlByElementId(
        state.xmlNodeSigned,
        state.xmlNodeVerifyAttribute,
        state.xmlNodeVerifyParent,
        (resp: Response) => {
          if (resp.isOk()) {
            if (!resp.getResult()) {
              setState({
                ...state,
                method: client.method,
                xmlNodeValid: CheckState.Failed,
                xmlNodeMessage: "Неправильная подпись",
              })

              return
            }

            setState({
              ...state,
              method: client.method,
              xmlNodeValid: CheckState.OK,
              xmlNodeMessage: "Валидная подпись",
            })

            return
          }

          handleError(
            resp,
            ValidationType.Password &&
              ValidationType.PasswordAttemps &&
              ValidationType.Signature
          )
        }
      )
    }
  }

  return (
    <div className="XMLNode">
      <Label method="signXMLById">
        Подписать XML по идентификатору элемента
      </Label>
      <TextArea onChange={handleXmlNodeChange} defaultValue={state.xmlNode} />
      <Spacer point="4" />
      <Label>Подписываемый элемент XML</Label>
      <Input type="text" onChange={handleXmlNodeElementChange} />
      <Spacer point="2" />
      <Label>Имя атрибута идентификации элемента XML</Label>
      <Input type="text" onChange={handleXmlNodeAttributeChange} />
      <Spacer point="2" />
      <Label>Верхний элемент для подписи</Label>
      <Input type="text" onChange={handleXmlNodeParentChange} />
      <Spacer point="4" />
      <Button onClick={handleXmlNodeClick}>Подпиcать данные</Button>
      <Label method="verifyXml(elemId)">Проверить подписанный XML</Label>
      <XMLCode data={state.xmlNodeSigned} />
      <Spacer point="4" />
      <Label>Имя атрибута идентификации элемента XML:</Label>
      <Input type="text" onChange={handleXmlNodeVerifyAttributeChange} />
      <Spacer point="2" />
      <Label>Верхний элемент для подписи:</Label>
      <Input type="text" onChange={handleXmlNodeVerifyParentChange} />
      <Spacer point="4" />
      <div className="flex flex-row justify-between">
        <Button onClick={handleXmlNodeVerify}>Проверить данные</Button>
        <SignatureCheck
          checkState={state.xmlNodeValid}
          message={state.xmlNodeMessage}
        />
      </div>
    </div>
  )
}

export default XMLNode
