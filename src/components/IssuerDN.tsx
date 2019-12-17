import React from 'react'

interface IssuerDNProps {
  value: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const IssuerDN: React.FC<IssuerDNProps> = ({ value, onClick }) => {
  return (
    <div className='IssuerDN'>
      <span>Данные Удостоверяющего центра <strong>(getIssuerDN)</strong></span>
      <br />
      <textarea readOnly value={value} />
      <button onClick={onClick}>Узнать</button>
    </div>
  )
}

export default IssuerDN
