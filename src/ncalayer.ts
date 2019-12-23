export enum MethodName {
  None = 'none',
  BrowseKeyStore = 'browseKeyStore',
  GetKeys = 'getKeys',
  SetLocale = 'setLocale',
  GetNotBefore = 'getNotBefore',
  GetNotAfter = 'getNotAfter',
  GetSubjectDN = 'getSubjectDN',
  GetIssuerDN = 'getIssuerDN',
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

  public BrowseKeyStore(storageName: string, fileExtension: string, currentDirectory: string): MethodName {
    const data: Payload = {
      method: MethodName.BrowseKeyStore,
      args: [storageName, fileExtension, currentDirectory],
    }
    return this.send(data)
  }

  public GetKeys(storageName: string, storagePath: string, password: string, type: string): MethodName {
    const data: Payload = {
      method: MethodName.GetKeys,
      args: [storageName, storagePath, password, type],
    }
    return this.send(data)
  }

  public SetLocale(lang: string): MethodName {
    const data: Payload = {
      method: MethodName.SetLocale,
      args: [lang],
    }
    return this.send(data)
  }

  public GetNotBefore(storageName: string, storagePath: string, keyAlias: string, password: string): MethodName {
    const data: Payload = {
      method: MethodName.GetNotBefore,
      args: [storageName, storagePath, keyAlias, password],
    }
    return this.send(data)
  }

  public GetNotAfter(storageName: string, storagePath: string, keyAlias: string, password: string): MethodName {
    const data: Payload = {
      method: MethodName.GetNotAfter,
      args: [storageName, storagePath, keyAlias, password],
    }
    return this.send(data)
  }

  public GetSubjectDN(storageName: string, storagePath: string, keyAlias: string, password: string): MethodName {
    const data: Payload = {
      method: MethodName.GetSubjectDN,
      args: [storageName, storagePath, keyAlias, password],
    }
    return this.send(data)
  }

  public GetIssuerDN(storageName: string, storagePath: string, keyAlias: string, password: string): MethodName {
    const data: Payload = {
      method: MethodName.GetIssuerDN,
      args: [storageName, storagePath, keyAlias, password],
    }
    return this.send(data)
  }

  private send(data: Payload): MethodName {
    this.ws.send(JSON.stringify(data))
    return data.method
  }
}
