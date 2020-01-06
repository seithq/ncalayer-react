const defaultXML = `<?xml version="1.0" encoding="utf-8"?>
                <root>
                    <name>Ivan</name>
                    <iin>123456789012</iin>
                </root>
`

const defaultXMLByElementId = `<?xml version="1.0" encoding="utf-8"?>
                <root>
                    <person id="personId">
                        <name>Ivan</name>
                        <iin>123456789012</iin>
                    </person>
                    <company id="companyId">
                        <name>Company Name</name>
                        <bin>123456789012</bin>
                    </company>
                </root>
`

interface AppState {
  version: ""
  alias: string
  path: string
  password: string
  keyType: string
  keyAlias: string
  keys: string[]
  lang: string
  notBefore: string
  notAfter: string
  subjectDN: string
  issuerDN: string
  oid: string
  rdn: string
  // plain data
  plainData: string
  plainDataSigned: string
  plainDataValid: boolean
  plainDataMessage: string
  // cms signature
  cmsSignature: string
  cmsSignatureFlag: boolean
  cmsSignatureSigned: string
  cmsSignatureValid: boolean
  cmsSignatureMessage: string
  // cms signature form file
  cmsFilePath: string
  cmsFileSignatureFlag: boolean
  cmsFileSignatureSigned: string
  cmsFileSignatureValid: boolean
  cmsFileSignatureMessage: string
  // xml
  xml: string
  xmlSigned: string
  xmlValid: boolean
  xmlMessage: string
  // xml by element id
  xmlNode: string
  xmlNodeElement: string
  xmlNodeAttribute: string
  xmlNodeParent: string
  xmlNodeVerifyAttribute: string
  xmlNodeVerifyParent: string
  xmlNodeSigned: string
  xmlNodeValid: boolean
  xmlNodeMessage: string
  // hash
  toHash: string
  alg: string
  hashed: string
}

export const initAppState = (): AppState => {
  return {
    version: "",
    alias: "NONE",
    path: "",
    password: "",
    keyType: "ALL",
    keyAlias: "",
    keys: [""],
    lang: "ru",
    notBefore: "",
    notAfter: "",
    subjectDN: "",
    issuerDN: "",
    oid: "2.5.4.3",
    rdn: "",
    // plain data
    plainData: "",
    plainDataSigned: "",
    plainDataValid: false,
    plainDataMessage: "Не проверено",
    // cms signature
    cmsSignature: "",
    cmsSignatureFlag: false,
    cmsSignatureSigned: "",
    cmsSignatureValid: false,
    cmsSignatureMessage: "Не проверено",
    // cms signature form file
    cmsFilePath: "",
    cmsFileSignatureFlag: false,
    cmsFileSignatureSigned: "",
    cmsFileSignatureValid: false,
    cmsFileSignatureMessage: "Не проверено",
    // xml
    xml: defaultXML,
    xmlSigned: "",
    xmlValid: false,
    xmlMessage: "Не проверено",
    // xml by element id
    xmlNode: defaultXMLByElementId,
    xmlNodeElement: "",
    xmlNodeAttribute: "",
    xmlNodeParent: "",
    xmlNodeVerifyAttribute: "",
    xmlNodeVerifyParent: "",
    xmlNodeSigned: "",
    xmlNodeValid: false,
    xmlNodeMessage: "Не проверено",
    // hash
    toHash: "",
    alg: "SHA1",
    hashed: "",
  }
}

export default AppState
