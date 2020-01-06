import React from "react"
import SignatureCheck from "./Fields/SignatureCheck"

interface CMSSignatureFileProps {
  filePath: string
  signed: string
  valid: boolean
  message: string
  onChoose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onToggle: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onVerify: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CMSSignatureFile: React.FC<CMSSignatureFileProps> = ({
  filePath,
  signed,
  valid,
  message,
  onToggle,
  onChoose,
  onClick,
  onVerify,
}) => {
  return (
    <div className="CMSSignatureFile">
      <span>
        Введите путь к файлу для подписи{" "}
        <strong>(createCMSSignatureFromFile)</strong>
      </span>
      <br />
      <input type="text" readOnly value={filePath} />
      <input type="checkbox" onClick={onToggle} /> Включить данные в подпись
      <br />
      <button onClick={onChoose}>Выбрать файл для подписания</button>
      <button onClick={onClick}>Подпиcать данные</button>
      <br />
      <span>
        Проверить подписанные данные{" "}
        <strong>(verifyCMSSignatureFromFile)</strong>
      </span>
      <br />
      <textarea readOnly value={signed} />
      <SignatureCheck verified={valid} message={message} />
      <br />
      <button onClick={onVerify}>Проверить данные</button>
    </div>
  )
}

export default CMSSignatureFile
