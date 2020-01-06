import React from "react"

interface KeyListProps {
  keys: string[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const KeyList: React.FC<KeyListProps> = ({ keys, onChange, onClick }) => {
  return (
    <div className="KeyList">
      <span>Список ключей:</span>
      <br />
      <select onChange={onChange}>
        {keys.map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          )
        })}
      </select>
      <button onClick={onClick}>Обновить список ключей</button>
    </div>
  )
}

export default KeyList
