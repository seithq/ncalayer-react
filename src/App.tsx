import React, { useState, useEffect, useRef } from "react"
import AppState, { initAppState } from "./state"
import Client from "@seithq/ncalayer"
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

  const client = new Client(ws.current!)

  return (
    <div className="App">
      <Layout ready={ready} state={state}>
        <Box>
          <StorageAlias client={client} state={state} setState={setState} />
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
