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
