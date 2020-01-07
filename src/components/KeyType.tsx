import React from "react"
import AppState from "../state"
import Radio from "./Fields/Radio"
import Label from "./Fields/Label"

const options = [
  {
    value: "SIGN",
    text: "Для подписи",
  },
  {
    value: "AUTH",
    text: "Для аутентификаций",
  },
  {
    value: "ALL",
    text: "Любой",
  },
]

interface KeyTypeProps {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const KeyType: React.FC<KeyTypeProps> = ({ state, setState }) => {
  return (
    <div className="KeyType">
      <Label>Тип ключа</Label>
      <div className="flex flex-row">
        {options.map(item => {
          return (
            <Radio
              key={item.value}
              text={item.text}
              onChange={e => {
                setState({ ...state, keyType: item.value })
              }}
              active={state.keyType === item.value}
            />
          )
        })}
      </div>
    </div>
  )
}

export default KeyType
