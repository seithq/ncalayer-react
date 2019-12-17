export enum MethodName {
  None = 'none',
  BrowseKeyStore = 'browseKeyStore',
  GetKeys = 'getKeys',
  SetLocale = 'setLocale',
  GetNotBefore = 'getNotBefore',
  GetNotAfter = 'getNotAfter',
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

  public SetLocale(lang: string) {
    const data: Payload = {
      method: MethodName.SetLocale,
      args: [lang],
    }
    this.send(data)
  }

  public GetNotBefore(storageName: string, storagePath: string, keyAlias: string, password: string) {
    const data: Payload = {
      method: MethodName.GetNotBefore,
      args: [storageName, storagePath, keyAlias, password],
    }
    this.send(data)
  }

  public GetNotAfter(storageName: string, storagePath: string, keyAlias: string, password: string) {
    const data: Payload = {
      method: MethodName.GetNotAfter,
      args: [storageName, storagePath, keyAlias, password],
    }
    this.send(data)
  }

  private send(data: Payload) {
    this.ws.send(JSON.stringify(data))
  }
}
