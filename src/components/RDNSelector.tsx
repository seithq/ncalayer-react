import React from "react"
import AppState from "../state"
import Client, { Response } from "@seithq/ncalayer"
import { checkInputs, ValidationType, handleError } from "../helper"
import Radio from "./Fields/Radio"
import Label from "./Fields/Label"
import Button from "./Fields/Button"
import Input from "./Fields/Input"
import Spacer from "./Fields/Spacer"

interface RDNSelectorProps {
  client: Client
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const options = [
  {
    value: "2.5.4.7",
    text: "Локализация(L)",
  },
  {
    value: "2.5.4.3",
    text: "Общепринятое имя(CN)",
  },
  {
    value: "2.5.4.4",
    text: "Фамилия(SURNAME)",
  },
  {
    value: "2.5.4.5",
    text: "ИИН(SERIALNUMBER)",
  },
  {
    value: "2.5.4.6",
    text: "Страна(C)",
  },
  {
    value: "2.5.4.8",
    text: "Область(S)",
  },
  {
    value: "2.5.4.10",
    text: "Название организации(O)",
  },
  {
    value: "2.5.4.11",
    text: "БИН(OU)",
  },
  {
    value: "1.2.840.113549.1.9.1",
    text: "Адрес электронной почты(E)",
  },
  {
    value: "0.9.2342.19200300.100.1.25",
    text: "Компонент домена(DC)",
  },
  {
    value: "2.5.4.15",
    text: "Бизнес категория(BC)",
  },
]

const RDNSelector: React.FC<RDNSelectorProps> = ({
  client,
  state,
  setState,
}) => {
  const handleRDNClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      client.getRdnByOid(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        state.oid,
        0,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({ ...state, method: client.method, rdn: resp.getResult() })
            return
          }

          handleError(
            resp,
            ValidationType.Password &&
              ValidationType.PasswordAttemps &&
              ValidationType.RDN
          )
        }
      )
    }
  }

  return (
    <div className="RDN">
      <Label method="getRdnByOid">Получить значение RDN по OID</Label>
      <div className="flex flex-col mb-4">
        {options.map(item => {
          return (
            <div key={item.value} className="mb-2 w-full">
              <Radio
                key={item.value}
                text={item.text}
                onChange={e => {
                  setState({ ...state, oid: item.value })
                }}
                active={state.oid === item.value}
              />
            </div>
          )
        })}
      </div>
      <Input type="text" readOnly value={state.rdn} />
      <Spacer point="4" />
      <Button onClick={handleRDNClick}>Получить RDN по OID</Button>
    </div>
  )
}

export default RDNSelector
