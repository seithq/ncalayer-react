import React from 'react'

interface SubjectDNProps {
  value: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SubjectDN: React.FC<SubjectDNProps> = ({ value, onClick }) => {
  return (
    <div className='SubjectDN'>
      <span>Данные субъекта <strong>(getSubjectDN)</strong></span>
      <br />
      <textarea readOnly value={value} />
      <button onClick={onClick}>Узнать</button>
    </div>
  )
}

export default SubjectDN
