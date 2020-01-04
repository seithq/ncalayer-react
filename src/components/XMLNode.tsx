import React from 'react'
import SignatureCheck from './Fields/SignatureCheck'

interface XMLNodeProps {
  defaultXML: string
  signed: string
  valid: boolean
  message: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onElementChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onIdAttrChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onParentElementChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onVerifyIdAttrChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onVerifyParentElementChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onVerify: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const XMLNode: React.FC<XMLNodeProps> = ({
  defaultXML,
  signed,
  valid,
  message,
  onChange,
  onElementChange,
  onIdAttrChange,
  onParentElementChange,
  onClick,
  onVerifyIdAttrChange,
  onVerifyParentElementChange,
  onVerify,
}) => {
  return (
    <div className='XMLNode'>
      <span>
        Подписать XML по идентификатору элемента <strong>(signXMLById)</strong>
      </span>
      <br />
      <textarea
        onChange={onChange}
        defaultValue={defaultXML}
        style={{ height: 100, width: 200 }}
      />
      <br />
      <label htmlFor='element'>Подписываемый элемент XML:</label>
      <input type='text' id='element' onChange={onElementChange} />
      <br />
      <label htmlFor='attr'>Имя атрибута идентификации элемента XML:</label>
      <input type='text' id='attr' onChange={onIdAttrChange} />
      <br />
      <label htmlFor='parent'>Верхний элемент для подписи:</label>
      <input type='text' id='parent' onChange={onParentElementChange} />
      <br />
      <button onClick={onClick}>Подпиcать данные</button>
      <br />
      <span>
        Проверить подписанный XML <strong>(verifyXml(String elemId))</strong>
      </span>
      <br />
      <textarea readOnly value={signed} />
      <SignatureCheck verified={valid} message={message} />
      <br />
      <label htmlFor='v-attr'>Имя атрибута идентификации элемента XML:</label>
      <input type='text' id='v-attr' onChange={onVerifyIdAttrChange} />
      <br />
      <label htmlFor='v-parent'>Верхний элемент для подписи:</label>
      <input type='text' id='v-parent' onChange={onVerifyParentElementChange} />
      <br />
      <button onClick={onVerify}>Проверить данные</button>
    </div>
  )
}

export default XMLNode
