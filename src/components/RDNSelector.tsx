import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { checkInputs } from "../helper"
import Radio from "./Fields/Radio"

interface RDNSelectorProps {
  client: NCALayer
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
  const handleOIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, oid: e.target.value })
  }

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
      setState({
        ...state,
        method: client.GetRdnByOid(
          state.alias,
          state.path,
          state.keyAlias,
          state.password,
          state.oid,
          0
        ),
      })
    }
  }

  return (
    <div className="RDN">
      <span>
        Получить значение RDN по OID <strong>(getRdnByOid)</strong>
      </span>
      <br />
      {options.map(item => {
        return (
          <Radio
            key={item.value}
            name="oid"
            value={item.value}
            onChange={handleOIDChange}
            checked={state.oid === item.value}
            text={item.text}
          />
        )
      })}
      <input type="text" readOnly value={state.rdn} />
      <button onClick={handleRDNClick}>Получить RDN по OID</button>
    </div>
  )
}

export default RDNSelector
