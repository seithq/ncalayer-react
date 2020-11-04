import React from "react"
import AppState, { CheckState } from "../state"
import Client, { Response } from "@seithq/ncalayer"
import { checkInputs, ValidationType, handleError } from "../helper"
import SignatureCheck from "./Fields/SignatureCheck"
import Button from "./Fields/Button"
import TextArea from "./Fields/TextArea"
import Label from "./Fields/Label"
import Spacer from "./Fields/Spacer"
import XMLCode from "./Fields/XMLCode"

interface XMLProps {
  client: Client
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
      client.signXml(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        state.xml,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({
              ...state,
              method: client.method,
              xmlSigned: resp.getResult(),
              xmlValid: CheckState.NotValidated,
              xmlMessage: "Не проверено",
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
      client.verifyXml(state.xmlSigned, (resp: Response) => {
        if (resp.isOk()) {
          if (!resp.getResult()) {
            setState({
              ...state,
              method: client.method,
              xmlValid: CheckState.Failed,
              xmlMessage: "Неправильная подпись",
            })

            return
          }

          setState({
            ...state,
            method: client.method,
            xmlValid: CheckState.OK,
            xmlMessage: "Валидная подпись",
          })

          return
        }

        handleError(
          resp,
          ValidationType.Password && ValidationType.PasswordAttemps
        )
      })
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
