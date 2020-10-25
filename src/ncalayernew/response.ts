import { isNone, isNullOrEmpty } from "./helper"
import { ErrorType } from "./constants"

export default class Response {
  private result: string
  private secondResult: string
  private errorCode: string

  constructor(result: string, secondResult: string, errorCode: string) {
    this.result = result
    this.secondResult = secondResult
    this.errorCode = errorCode
  }

  isOk(): boolean {
    return isNone(this.errorCode) && !isNullOrEmpty(this.result)
  }

  getResult(): string {
    return this.result
  }

  getSecondResult(): string {
    return this.secondResult
  }

  getErrorCode(): string {
    return this.errorCode
  }

  isErrorType(input: ErrorType): boolean {
    return this.errorCode === input
  }

  isWrongPasswordWithAttempts(): boolean {
    return this.isWrongPassword() && +this.result > -1
  }

  isWrongPassword(): boolean {
    return this.isErrorType(ErrorType.WrongPassword)
  }

  isWrongKeyType(): boolean {
    return this.isErrorType(ErrorType.EmptyKeyList)
  }

  isRdnNotFound(): boolean {
    return this.isErrorType(ErrorType.RdnNotFound)
  }

  isWrongXml(): boolean {
    return this.isErrorType(ErrorType.XmlParseException)
  }

  isWrongSignature(): boolean {
    return this.isErrorType(ErrorType.SignatureValidation)
  }
}
