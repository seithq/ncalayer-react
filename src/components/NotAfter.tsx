import React from 'react'

interface NotAfterProps {
  value: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const NotAfter: React.FC<NotAfterProps> = ({ value, onClick }) => {
  return (
    <div className='NotAfter'>
      <span>
        Время исхода действия сертификата <strong>(getNotAfter)</strong>
      </span>
      <br />
      <input type='text' readOnly value={value} />
      <button onClick={onClick}>Узнать</button>
    </div>
  )
}

export default NotAfter
