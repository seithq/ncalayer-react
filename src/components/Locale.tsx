import React from 'react'

interface LocaleProps {
  selected: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Locale: React.FC<LocaleProps> = ({ selected, onChange, onClick }) => {
  return (
    <div className='Locale'>
      <span>
        Установка языка <strong>(setLocale)</strong>
      </span>
      <br />
      <input
        type='radio'
        name='lang'
        value='kk'
        onChange={onChange}
        checked={selected === 'kk'}
      />{' '}
      Казахский
      <br />
      <input
        type='radio'
        name='lang'
        value='ru'
        onChange={onChange}
        checked={selected === 'ru'}
      />{' '}
      Русский
      <br />
      <input
        type='radio'
        name='lang'
        value='en'
        onChange={onChange}
        checked={selected === 'en'}
      />{' '}
      Английский
      <br />
      <button onClick={onClick}>Сменить язык</button>
    </div>
  )
}

export default Locale
