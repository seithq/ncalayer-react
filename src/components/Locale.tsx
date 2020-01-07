import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import Button from "./Fields/Button"
import Radio from "./Fields/Radio"
import Label from "./Fields/Label"

const options = [
  {
    value: "kk",
    text: "Казахский",
  },
  {
    value: "ru",
    text: "Русский",
  },
  {
    value: "en",
    text: "Английский",
  },
]

interface LocaleProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const Locale: React.FC<LocaleProps> = ({ client, state, setState }) => {
  const handleLangClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState({ ...state, method: client.SetLocale(state.lang) })
  }

  return (
    <div className="Locale">
      <Label method="setLocale">Тип ключа</Label>
      <div className="flex flex-row mb-4">
        {options.map(item => {
          return (
            <Radio
              key={item.value}
              text={item.text}
              onChange={e => {
                setState({ ...state, lang: item.value })
              }}
              active={state.lang === item.value}
            />
          )
        })}
      </div>
      <Button onClick={handleLangClick}>Сменить язык</Button>
    </div>
  )
}

export default Locale
