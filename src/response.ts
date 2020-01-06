import { isNone, isNullOrEmpty } from "./helper"

export enum ValidationType {
  Common = "common",
  Password = "password",
  PasswordAttemps = "passwordAttempts",
  KeyType = "keyType",
  RDN = "rdn",
  XML = "xml",
  Signature = "signature",
}

export default class Response {
  private result: string
  private secondResult: string
  private errorCode: string

  constructor(result: string, secondResult: string, errorCode: string) {
    this.result = result
    this.secondResult = secondResult
    this.errorCode = errorCode
  }

  public IsOK(): boolean {
    return isNone(this.errorCode) && !isNullOrEmpty(this.result)
  }

  public GetResult(): string {
    return this.result
  }

  public GetSecondResult(): string {
    return this.secondResult
  }

  public GetErrorCode(): string {
    return this.errorCode
  }

  public IsWrongPasswordWithAttempts(): boolean {
    return this.IsWrongPassword() && +this.result > -1
  }

  public IsWrongPassword(): boolean {
    return this.errorCode === "WRONG_PASSWORD"
  }

  public IsWrongKeyType(): boolean {
    return this.errorCode === "EMPTY_KEY_LIST"
  }

  public IsRDNNotFound(): boolean {
    return this.errorCode === "RDN_NOT_FOUND"
  }

  public IsWrongXml(): boolean {
    return this.errorCode === "XML_PARSE_EXCEPTION"
  }

  public IsWrongSignature(): boolean {
    return this.errorCode === "SIGNATURE_VALIDATION_ERROR"
  }

  public HandleError(type: ValidationType): void {
    if (type === ValidationType.PasswordAttemps) {
      if (this.IsWrongPasswordWithAttempts()) {
        alert(
          "Неправильный пароль! Количество оставшихся попыток: " +
            this.GetResult()
        )
        return
      }
    }

    if (type === ValidationType.Password) {
      if (this.IsWrongPassword()) {
        alert("Неправильный пароль!")
        return
      }
    }

    if (type === ValidationType.KeyType) {
      if (this.IsWrongKeyType()) {
        alert("Ключи не найдены. Попробуйте выбрать другой тип ключа")
        return
      }
    }

    if (type === ValidationType.RDN) {
      if (this.IsRDNNotFound()) {
        alert("Ключ не содержит данный параметр")
        return
      }
    }

    if (type === ValidationType.XML) {
      if (this.IsWrongXml()) {
        alert("Невалидный формат XML")
        return
      }
    }

    if (type === ValidationType.Signature) {
      if (this.IsWrongSignature()) {
        alert("Ошибка валидации XML")
        return
      }
    }

    alert("Ошибка: " + this.GetErrorCode())
  }
}
