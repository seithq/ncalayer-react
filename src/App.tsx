import React, { useState, useEffect, useRef } from "react"
import AppState, { initAppState, CheckState } from "./state"
import NCALayer, { MethodName } from "./ncalayer"
import Client from "./ncalayernew"
import Response, { ValidationType } from "./response"
import { isNullOrEmpty, extractKeyAlias } from "./helper"
import Layout from "./components/Layout"
import StorageAlias from "./components/StorageAlias"
import StoragePath from "./components/StoragePath"
import Password from "./components/Password"
import KeyType from "./components/KeyType"
import KeyList from "./components/KeyList"
import Locale from "./components/Locale"
import NotBefore from "./components/NotBefore"
import NotAfter from "./components/NotAfter"
import SubjectDN from "./components/SubjectDN"
import IssuerDN from "./components/IssuerDN"
import RDNSelector from "./components/RDNSelector"
import PlainData from "./components/PlainData"
import CMSSignature from "./components/CMSSignature"
import CMSSignatureFile from "./components/CMSSignatureFile"
import XML from "./components/XML"
import XMLNode from "./components/XMLNode"
import Hasher from "./components/Hasher"
import Box from "./components/Fields/Box"

const App: React.FC = () => {
  // refs
  const ws = useRef<WebSocket>()

  // state
  const [ready, setReady] = useState(false)
  // const [method, setMethod] = useState<MethodName>(MethodName.None)

  // input state
  const [state, setState] = useState<AppState>(initAppState())

  // setup ws
  useEffect(() => {
    ws.current = new WebSocket("wss://127.0.0.1:13579/")

    ws.current.onopen = e => {
      // tslint:disable-next-line
      console.log("connection opened")
      setReady(true)
    }

    ws.current.onclose = e => {
      if (e.wasClean) {
        // tslint:disable-next-line
        console.log("connection closed")
      } else {
        // tslint:disable-next-line
        console.log(
          "connection error: [code]=" + e.code + ", [reason]=" + e.reason
        )
      }
      setReady(false)
    }

    return () => {
      ws.current!.close()
    }
  }, [setReady])

  // set onmessage
  useEffect(() => {
    const browseKeyStoreCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, path: resp.GetResult() })
      }
    }

    const showFileChooserCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, cmsFilePath: resp.GetResult() })
      }
    }

    const getKeysCallback = (resp: Response) => {
      if (resp.IsOK()) {
        const k: string[] = []
        resp
          .GetResult()
          .split("\n")
          .forEach(el => {
            if (isNullOrEmpty(el)) {
              return
            }
            k.push(el)
          })
        setState({
          ...state,
          keys: k,
          keyAlias: k.length > 0 ? extractKeyAlias(k[0]) : "",
        })

        return
      }

      setState({ ...state, keys: [], keyAlias: "" })
      resp.HandleError(
        ValidationType.Password &&
          ValidationType.PasswordAttemps &&
          ValidationType.KeyType
      )
    }

    const getNotBeforeCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, notBefore: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const getNotAfterCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, notAfter: resp.GetResult() })
        return
      }
      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const getSubjectDNCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, subjectDN: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const getIssuerDNCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, issuerDN: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const getRdnByOidCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, rdn: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password &&
          ValidationType.PasswordAttemps &&
          ValidationType.RDN
      )
    }

    const signPlainDataCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, plainDataSigned: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const verifyPlainDataCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            plainDataValid: CheckState.Failed,
            plainDataMessage: "Неправильная подпись",
          })
          return
        }

        setState({
          ...state,
          plainDataValid: CheckState.OK,
          plainDataMessage: "Валидная подпись",
        })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const createCMSSignatureCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, cmsSignatureSigned: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const verifyCMSSignatureCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            cmsSignatureValid: CheckState.Failed,
            cmsSignatureMessage: "Неправильная подпись",
          })
          return
        }

        setState({
          ...state,
          cmsSignatureValid: CheckState.OK,
          cmsSignatureMessage: "Валидная подпись",
        })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const createCMSSignatureFromFileCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, cmsFileSignatureSigned: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const verifyCMSSignatureFromFileCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            cmsFileSignatureValid: CheckState.Failed,
            cmsFileSignatureMessage: "Неправильная подпись",
          })
          return
        }

        setState({
          ...state,
          cmsFileSignatureValid: CheckState.OK,
          cmsFileSignatureMessage: "Валидная подпись",
        })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const signXmlCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, xmlSigned: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const verifyXmlCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            xmlValid: CheckState.Failed,
            xmlMessage: "Неправильная подпись",
          })
          return
        }

        setState({
          ...state,
          xmlValid: CheckState.OK,
          xmlMessage: "Валидная подпись",
        })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const signXmlByElementIdCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, xmlNodeSigned: resp.GetResult() })
        return
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      )
    }

    const verifyXmlByElementIdCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            xmlNodeValid: CheckState.Failed,
            xmlNodeMessage: "Неправильная подпись",
          })
          return
        }

        setState({
          ...state,
          xmlNodeValid: CheckState.OK,
          xmlNodeMessage: "Валидная подпись",
        })
        return
      }

      resp.HandleError(
        ValidationType.Password &&
          ValidationType.PasswordAttemps &&
          ValidationType.Signature
      )
    }

    const getHashCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, hashed: resp.GetResult() })
        return
      }

      resp.HandleError(ValidationType.Common)
    }

    ws.current!.onmessage = e => {
      if (e.data === "--heartbeat--") {
        return
      }

      const data = JSON.parse(e.data)
      if (data !== null) {
        const resp = new Response(
          data.result,
          data.secondResult,
          data.errorCode
        )

        switch (state.method) {
          case MethodName.BrowseKeyStore:
            browseKeyStoreCallback(resp)
            break
          case MethodName.ShowFileChooser:
            showFileChooserCallback(resp)
            break
          case MethodName.GetKeys:
            getKeysCallback(resp)
            break
          case MethodName.GetNotBefore:
            getNotBeforeCallback(resp)
            break
          case MethodName.GetNotAfter:
            getNotAfterCallback(resp)
            break
          case MethodName.GetSubjectDN:
            getSubjectDNCallback(resp)
            break
          case MethodName.GetIssuerDN:
            getIssuerDNCallback(resp)
            break
          case MethodName.GetRdnByOid:
            getRdnByOidCallback(resp)
            break
          case MethodName.SignPlainData:
            signPlainDataCallback(resp)
            break
          case MethodName.VerifyPlainData:
            verifyPlainDataCallback(resp)
            break
          case MethodName.CreateCMSSignature:
            createCMSSignatureCallback(resp)
            break
          case MethodName.VerifyCMSSignature:
            verifyCMSSignatureCallback(resp)
            break
          case MethodName.CreateCMSSignatureFromFile:
            createCMSSignatureFromFileCallback(resp)
            break
          case MethodName.VerifyCMSSignatureFromFile:
            verifyCMSSignatureFromFileCallback(resp)
            break
          case MethodName.SignXml:
            signXmlCallback(resp)
            break
          case MethodName.VerifyXml:
            verifyXmlCallback(resp)
            break
          case MethodName.SignXmlByElementId:
            signXmlByElementIdCallback(resp)
            break
          case MethodName.VerifyXmlByElementId:
            verifyXmlByElementIdCallback(resp)
            break
          case MethodName.GetHash:
            getHashCallback(resp)
            break
          default:
            // tslint:disable-next-line
            console.log(e)
            const payload = JSON.parse(e.data)
            if (payload.result.version) {
              setState({ ...state, version: payload.result.version })
            }
            break
        }
      }
    }
  }, [state, setState])

  // NCALayer client
  const client = new NCALayer(ws.current!)
  const newclient = new Client(ws.current!)

  return (
    <div className="App">
      <Layout ready={ready} state={state}>
        <Box>
          <StorageAlias client={newclient} state={state} setState={setState} />
          <StoragePath path={state.path} />
          <Password state={state} setState={setState} />
          <KeyType state={state} setState={setState} />
          <KeyList client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <Locale client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <NotBefore client={client} state={state} setState={setState} />
          <NotAfter client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <SubjectDN client={client} state={state} setState={setState} />
          <IssuerDN client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <RDNSelector client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <PlainData client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <CMSSignature client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <CMSSignatureFile client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <XML client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <XMLNode client={client} state={state} setState={setState} />
        </Box>
        <Box>
          <Hasher client={client} state={state} setState={setState} />
        </Box>
      </Layout>
    </div>
  )
}

export default App
