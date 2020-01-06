export const isNone = (s: string): boolean => {
  return s === "NONE"
}

export const isNullOrEmpty = (s: string): boolean => {
  return s === null || s === ""
}

export const extractKeyAlias = (s: string): string => {
  const parts = s.split("|")
  if (parts.length < 4) {
    return ""
  }
  return parts[3]
}

export interface InputCheck {
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
