import React from "react"
import SignatureCheck from "./Fields/SignatureCheck"

interface CMSSignatureProps {
  signed: string
  valid: boolean
  message: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onToggle: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onVerify: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CMSSignature: React.FC<CMSSignatureProps> = ({
  signed,
  valid,
  message,
  onChange,
  onToggle,
  onClick,
  onVerify,
}) => {
  return (
    <div className="CMSSignature">
      <span>
        Введите данные для подписи <strong>(createCMSSignature)</strong>
      </span>
      <br />
      <input type="text" onChange={onChange} />
      <input type="checkbox" onClick={onToggle} /> Включить данные в подпись
      <br />
      <button onClick={onClick}>Подпиcать данные</button>
      <br />
      <span>
        Проверить подписанные данные <strong>(verifyCMSSignature)</strong>
      </span>
      <br />
      <textarea readOnly value={signed} />
      <SignatureCheck verified={valid} message={message} />
      <br />
      <button onClick={onVerify}>Проверить данные</button>
    </div>
  )
}

export default CMSSignature
