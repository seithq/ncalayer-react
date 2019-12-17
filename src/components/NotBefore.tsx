import React from 'react'

interface NotBeforeProps {
  value: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const NotBefore: React.FC<NotBeforeProps> = ({ value, onClick }) => {
  return (
    <div className='NotBefore'>
      <span>Время начала действия сертификата <strong>(getNotBefore)</strong></span>
      <br />
      <input type='text' readOnly value={value} />
      <button onClick={onClick}>Узнать</button>
    </div>
  )
}

export default NotBefore
