export interface Response {
  result: string
  secondResult: string
  errorCode: string
}

export enum MethodName {
  None = 'none',
  BrowseKeyStore = 'browseKeyStore',
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
    this.ws.send(JSON.stringify(data))
  }
}
