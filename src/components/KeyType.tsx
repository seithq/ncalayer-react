import React from "react"
import Radio from "./Fields/Radio"

interface KeyTypeProps {
  selected: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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

const KeyType: React.FC<KeyTypeProps> = ({ selected, onChange }) => {
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
            onChange={onChange}
            checked={selected === item.value}
            text={item.text}
          />
        )
      })}
    </div>
  )
}

export default KeyType
