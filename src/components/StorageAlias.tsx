import React from 'react'

interface StorageAliasProps {
  selected: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const StorageAlias: React.FC<StorageAliasProps> = ({ selected, onChange }) => {
  return (
    <div className='StorageAlias'>
      <span>Тип хранилища ключа:</span>
      <br />
      <select onChange={onChange} value={selected}>
        <option value='NONE'>-- Выберите тип --</option>
        <option value='PKCS12'>Ваш Компьютер</option>
        <option value='AKKaztokenStore'>Казтокен</option>
        <option value='AKKZIDCardStore'>Личное Удостоверение</option>
        <option value='AKEToken72KStore'>EToken Java 72k</option>
        <option value='AKJaCartaStore'>AK JaCarta</option>
      </select>
    </div>
  )
}

export default StorageAlias
