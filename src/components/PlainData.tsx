import React from "react"
import SignatureCheck from "./Fields/SignatureCheck"

interface PlainDataProps {
  signed: string
  valid: boolean
  message: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onVerify: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PlainData: React.FC<PlainDataProps> = ({
  signed,
  valid,
  message,
  onChange,
  onClick,
  onVerify,
}) => {
  return (
    <div className="PlainData">
      <span>
        Введите данные для подписи <strong>(signPlainData)</strong>
      </span>
      <br />
      <input type="text" onChange={onChange} />
      <button onClick={onClick}>Подпиcать данные</button>
      <br />
      <span>
        Проверить подписанные данные <strong>(verifyPlainData)</strong>
      </span>
      <br />
      <textarea readOnly value={signed} />
      <SignatureCheck verified={valid} message={message} />
      <br />
      <button onClick={onVerify}>Проверить данные</button>
    </div>
  )
}

export default PlainData
