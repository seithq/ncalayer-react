import React from 'react'
import SignatureCheck from './Fields/SignatureCheck'

interface XMLProps {
  defaultXML: string
  signed: string
  valid: boolean
  message: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onVerify: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const XML: React.FC<XMLProps> = ({
  defaultXML,
  signed,
  valid,
  message,
  onChange,
  onClick,
  onVerify,
}) => {
  return (
    <div className='XML'>
      <span>
        XML для подписи <strong>(signXML)</strong>
      </span>
      <br />
      <textarea
        onChange={onChange}
        defaultValue={defaultXML}
        style={{ height: 100, width: 200 }}
      />
      <button onClick={onClick}>Подпиcать данные</button>
      <br />
      <span>
        Проверить подписанный XML <strong>(verifyXml)</strong>
      </span>
      <br />
      <textarea readOnly value={signed} />
      <SignatureCheck verified={valid} message={message} />
      <br />
      <button onClick={onVerify}>Проверить данные</button>
    </div>
  )
}

export default XML
