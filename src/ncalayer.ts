import { isNone, isNullOrEmpty } from './helper'

export class Response {
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

export enum MethodName {
  None = 'none',
  BrowseKeyStore = 'browseKeyStore',
  GetKeys = 'getKeys',
}

interface Payload {
  method: MethodName
  args: string[]
}

export default class NCALayer {
  private ws: WebSocket

  constructor(ws: WebSocket) {
    this.ws = ws
  }

  public BrowseKeyStore(storageName: string, fileExtension: string, currentDirectory: string) {
    const data: Payload = {
      method: MethodName.BrowseKeyStore,
      args: [storageName, fileExtension, currentDirectory],
    }
    this.send(data)
  }

  public GetKeys(storageName: string, storagePath: string, password: string, type: string) {
    const data: Payload = {
      method: MethodName.GetKeys,
      args: [storageName, storagePath, password, type],
    }
    this.send(data)
  }

  private send(data: Payload) {
    this.ws.send(JSON.stringify(data))
  }
}
