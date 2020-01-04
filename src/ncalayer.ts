export enum MethodName {
  None = 'none',
  BrowseKeyStore = 'browseKeyStore',
  GetKeys = 'getKeys',
  SetLocale = 'setLocale',
  GetNotBefore = 'getNotBefore',
  GetNotAfter = 'getNotAfter',
  GetSubjectDN = 'getSubjectDN',
  GetIssuerDN = 'getIssuerDN',
  GetRdnByOid = 'getRdnByOid',
  SignPlainData = 'signPlainData',
  VerifyPlainData = 'verifyPlainData',
  CreateCMSSignature = 'createCMSSignature',
  VerifyCMSSignature = 'verifyCMSSignature',
  SignXml = 'signXml',
  VerifyXml = 'verifyXml',
  SignXmlByElementId = 'signXmlByElementId',
  VerifyXmlByElementId = 'verifyXmlByElementId',
  GetHash = 'getHash',
}

interface Payload {
  method: MethodName
  args: any[]
}

export default class NCALayer {
  private ws: WebSocket

  constructor(ws: WebSocket) {
    this.ws = ws
  }

  public BrowseKeyStore(
    storageName: string,
    fileExtension: string,
    currentDirectory: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.BrowseKeyStore,
      args: [storageName, fileExtension, currentDirectory],
    }
    return this.send(data)
  }

  public GetKeys(
    storageName: string,
    storagePath: string,
    password: string,
    type: string
  ): MethodName {
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

  public GetNotBefore(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.GetNotBefore,
      args: [storageName, storagePath, keyAlias, password],
    }
    return this.send(data)
  }

  public GetNotAfter(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.GetNotAfter,
      args: [storageName, storagePath, keyAlias, password],
    }
    return this.send(data)
  }

  public GetSubjectDN(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.GetSubjectDN,
      args: [storageName, storagePath, keyAlias, password],
    }
    return this.send(data)
  }

  public GetIssuerDN(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.GetIssuerDN,
      args: [storageName, storagePath, keyAlias, password],
    }
    return this.send(data)
  }

  public GetRdnByOid(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    oid: string,
    oidIndex: number
  ): MethodName {
    const data: Payload = {
      method: MethodName.GetRdnByOid,
      args: [storageName, storagePath, keyAlias, password, oid, oidIndex],
    }
    return this.send(data)
  }

  public SignPlainData(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.SignPlainData,
      args: [storageName, storagePath, keyAlias, password, toSign],
    }
    return this.send(data)
  }

  public VerifyPlainData(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toVerify: string,
    signature: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.VerifyPlainData,
      args: [storageName, storagePath, keyAlias, password, toVerify, signature],
    }
    return this.send(data)
  }

  public CreateCMSSignature(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    attached: boolean
  ): MethodName {
    const data: Payload = {
      method: MethodName.CreateCMSSignature,
      args: [storageName, storagePath, keyAlias, password, toSign, attached],
    }
    return this.send(data)
  }

  public VerifyCMSSignature(toVerify: string, signature: string): MethodName {
    const data: Payload = {
      method: MethodName.VerifyCMSSignature,
      args: [toVerify, signature],
    }
    return this.send(data)
  }

  public SignXml(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.SignXml,
      args: [storageName, storagePath, keyAlias, password, toSign],
    }
    return this.send(data)
  }

  public VerifyXml(signature: string): MethodName {
    const data: Payload = {
      method: MethodName.VerifyXml,
      args: [signature],
    }
    return this.send(data)
  }

  public SignXmlByElementId(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    elementName: string,
    idAttrName: string,
    parentElementName: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.SignXmlByElementId,
      args: [
        storageName,
        storagePath,
        keyAlias,
        password,
        toSign,
        elementName,
        idAttrName,
        parentElementName,
      ],
    }
    return this.send(data)
  }

  public VerifyXmlByElementId(
    signature: string,
    idAttrName: string,
    parentElementName: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.VerifyXml,
      args: [signature, idAttrName, parentElementName],
    }
    this.send(data)
    return MethodName.VerifyXmlByElementId
  }

  public GetHash(input: string, digestAlg: string): MethodName {
    const data: Payload = {
      method: MethodName.GetHash,
      args: [input, digestAlg],
    }
    return this.send(data)
  }

  private send(data: Payload): MethodName {
    this.ws.send(JSON.stringify(data))
    return data.method
  }
}
