import React from 'react'

interface KeyTypeProps {
  selected: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const KeyType: React.FC<KeyTypeProps> = ({ selected, onChange }) => {
  return (
    <div className='KeyType'>
      <span>Тип ключа:</span>
      <br />
      <input
        type='radio'
        name='keyType'
        value='SIGN'
        onChange={onChange}
        checked={selected === 'SIGN'} /> Для подписи
      <br />
      <input
        type='radio'
        name='keyType'
        value='AUTH'
        onChange={onChange}
        checked={selected === 'AUTH'} /> Для аутентификаций
      <br />
      <input
        type='radio'
        name='keyType'
        value='ALL'
        onChange={onChange}
        checked={selected === 'ALL'} /> Любой
      <br />
    </div>
  )
}

export default KeyType
