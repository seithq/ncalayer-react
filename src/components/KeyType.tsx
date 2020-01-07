import React from "react"
import AppState from "../state"
import Radio from "./Fields/Radio"

interface KeyTypeProps {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

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

const KeyType: React.FC<KeyTypeProps> = ({ state, setState }) => {
  const handleKeyTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, keyType: e.target.value })
  }

  return (
    <div className="KeyType">
      <span>Тип ключа:</span>
      <br />
      {options.map(item => {
        return (
          <Radio
            key={item.value}
            name="keyType"
            value={item.value}
            onChange={handleKeyTypeChange}
            checked={state.keyType === item.value}
            text={item.text}
          />
        )
      })}
    </div>
  )
}

export default KeyType
