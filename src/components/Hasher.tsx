import React from 'react'

const options = [
  {
    value: 'SHA1',
    text: 'SHA1',
  },
  {
    value: 'SHA256',
    text: 'SHA256',
  },
  {
    value: 'GOST34311',
    text: 'GOST34311',
  },
]

interface HasherProps {
  selected: string
  hashed: string
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Hasher: React.FC<HasherProps> = ({
  selected,
  hashed,
  onSelect,
  onChange,
  onClick,
}) => {
  return (
    <div className='Hasher'>
      <span>
        Получить Хэш данных по указанному алгоритму <strong>(getHash)</strong>
      </span>
      <br />
      <select onChange={onSelect} defaultValue={selected}>
        {options.map(item => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          )
        })}
      </select>
      <br />
      <span>Введите данные для хеширование:</span>
      <br />
      <input type='text' onChange={onChange} />
      <br />
      <textarea readOnly value={hashed} />
      <br />
      <button onClick={onClick}>Получить хэш</button>
    </div>
  )
}

export default Hasher
