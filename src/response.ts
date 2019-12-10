import { isNone, isNullOrEmpty } from './helper'

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
    return this.errorCode === 'WRONG_PASSWORD'
  }

  public IsWrongKeyType(): boolean {
    return this.errorCode === 'EMPTY_KEY_LIST'
  }
}
