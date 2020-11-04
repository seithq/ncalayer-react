import { Response } from "@seithq/ncalayer"

export const isNone = (s: string): boolean => {
  return s === "NONE"
}

export const isNullOrEmpty = (s: string): boolean => {
  return s === null || s === ""
}

export type InputCheck = {
  path?: string
  alias?: string
  password?: string
  keyAlias?: string
  elementName?: string
  attribute?: string
}

export const checkInputs = (input: InputCheck): boolean => {
  if (input.path !== undefined && input.path === "") {
    alert("Не выбрано хранилище")
    return false
  }

  if (input.alias !== undefined && input.alias === "") {
    alert("Не выбрано хранилище")
    return false
  }

  if (input.password !== undefined && input.password === "") {
    alert("Введите пароль к хранилищу")
    return false
  }

  if (input.keyAlias !== undefined && input.keyAlias === "") {
    alert("Не выбран ключ")
    return false
  }

  if (input.elementName !== undefined && input.elementName === "") {
    alert("Не выбран подписываемый элемент")
    return false
  }

  if (input.attribute !== undefined && input.attribute === "") {
    alert("Не выбран атрибут идентификации элемента")
    return false
  }

  return true
}

export enum ValidationType {
  Common = "common",
  Password = "password",
  PasswordAttemps = "passwordAttempts",
  KeyType = "keyType",
  RDN = "rdn",
  XML = "xml",
  Signature = "signature",
}

export function handleError(resp: Response, type: ValidationType): void {
  if (type === ValidationType.PasswordAttemps) {
    if (resp.isPasswordAttemptsError()) {
      alert(
        "Неправильный пароль! Количество оставшихся попыток: " +
          resp.getResult()
      )
      return
    }
  }

  if (type === ValidationType.Password) {
    if (resp.isPasswordError()) {
      alert("Неправильный пароль!")
      return
    }
  }

  if (type === ValidationType.KeyType) {
    if (resp.isKeyTypeError()) {
      alert("Ключи не найдены. Попробуйте выбрать другой тип ключа")
      return
    }
  }

  if (type === ValidationType.RDN) {
    if (resp.isRdnNotFoundError()) {
      alert("Ключ не содержит данный параметр")
      return
    }
  }

  if (type === ValidationType.XML) {
    if (resp.isXmlParseError()) {
      alert("Невалидный формат XML")
      return
    }
  }

  if (type === ValidationType.Signature) {
    if (resp.isSignatureValidationError()) {
      alert("Ошибка валидации XML")
      return
    }
  }

  alert("Ошибка: " + resp.getErrorCode())
}
