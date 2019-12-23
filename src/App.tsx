import React, { useState, useEffect, useRef } from 'react'
import NCALayer, { MethodName } from './ncalayer'
import Response, { ValidationType } from './response'
import { isNone, isNullOrEmpty, extractKeyAlias, checkInputs } from './helper'
import Error from './components/Error'
import Status from './components/Status'
import StorageAlias from './components/StorageAlias'
import StoragePath from './components/StoragePath'
import Password from './components/Password'
import KeyType from './components/KeyType'
import KeyList from './components/KeyList'
import Locale from './components/Locale'
import NotBefore from './components/NotBefore'
import NotAfter from './components/NotAfter'
import SubjectDN from './components/SubjectDN'
import IssuerDN from './components/IssuerDN'

const App: React.FC = () => {
  // refs
  const ws = useRef<WebSocket>()

  // state
  const [ready, setReady] = useState(false)
  const [method, setMethod] = useState<MethodName>(MethodName.None)

  // input state
  const [state, setState] = useState({
    alias: 'NONE',
    path: '',
    password: '',
    keyType: 'ALL',
    keyAlias: '',
    keys: [''],
    lang: 'ru',
    notBefore: '',
    notAfter: '',
    subjectDN: '',
    issuerDN: '',
  })

  // setup ws
  useEffect(() => {
    ws.current = new WebSocket('wss://127.0.0.1:13579/')

    ws.current.onopen = (e) => {
      // tslint:disable-next-line
      console.log('connection opened')
      setReady(true)
    }

    ws.current.onclose = (e) => {
      if (e.wasClean) {
        // tslint:disable-next-line
        console.log('connection closed')
      } else {
        // tslint:disable-next-line
        console.log('connection error: [code]=' + e.code + ', [reason]=' + e.reason)
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

    const getKeysCallback = (resp: Response) => {
      if (resp.IsOK()) {
        const k: string[] = []
        resp.GetResult().split('\n').forEach((el) => {
          if (isNullOrEmpty(el)) {
            return
          }
          k.push(el)
        })
        setState({
          ...state,
          keys: k,
          keyAlias: (k.length > 0) ? extractKeyAlias(k[0]) : '',
        })

        return
      }

      setState({ ...state, keys: [], keyAlias: '' })
      resp.HandleError(
        ValidationType.Password &&
        ValidationType.PasswordAttemps &&
        ValidationType.KeyType)
    }

    const getNotBeforeCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, notBefore: resp.GetResult() })
        return
      }

      resp.HandleError(ValidationType.Password && ValidationType.PasswordAttemps)
    }

    const getNotAfterCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, notAfter: resp.GetResult() })
        return
      }
      resp.HandleError(ValidationType.Password && ValidationType.PasswordAttemps)
    }

    const getSubjectDNCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, subjectDN: resp.GetResult() })
        return
      }

      resp.HandleError(ValidationType.Password && ValidationType.PasswordAttemps)
    }

    const getIssuerDNCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, issuerDN: resp.GetResult() })
        return
      }

      resp.HandleError(ValidationType.Password && ValidationType.PasswordAttemps)
    }

    ws.current!.onmessage = (e) => {
      if (e.data === '--heartbeat--') {
        return
      }

      const data = JSON.parse(e.data)
      if (data !== null) {
        const resp = new Response(
          data.result,
          data.secondResult,
          data.errorCode,
        )

        switch (method) {
          case MethodName.BrowseKeyStore:
            browseKeyStoreCallback(resp)
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
          default:
            // tslint:disable-next-line
            console.log(e)
            break
        }
      }
    }
  }, [method, state, setState])

  // NCALayer client
  const client = new NCALayer(ws.current!)

  // handlers
  const handleAliasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isNone(e.target.value)) {
      setState({ ...state, alias: e.target.value })
      setMethod(MethodName.BrowseKeyStore)
      client.BrowseKeyStore(e.target.value, 'P12', state.path)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value })
  }

  const handleKeyTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, keyType: e.target.value })
  }

  const handleKeyAliasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, keyAlias: extractKeyAlias(e.target.value) })
  }

  const handleKeyAliasClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
    })
    if (ok) {
      setMethod(MethodName.GetKeys)
      client.GetKeys(state.alias, state.path, state.password, state.keyType)
    }
  }

  const handleLangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, lang: e.target.value })
  }

  const handleLangClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMethod(MethodName.SetLocale)
    client.SetLocale(state.lang)
  }

  const handleNotBeforeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      setMethod(MethodName.GetNotBefore)
      client.GetNotBefore(state.alias, state.path, state.keyAlias, state.password)
    }
  }

  const handleNotAfterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      setMethod(MethodName.GetNotAfter)
      client.GetNotAfter(state.alias, state.path, state.keyAlias, state.password)
    }
  }

  const handleSubjectDNClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      setMethod(MethodName.GetSubjectDN)
      client.GetSubjectDN(state.alias, state.path, state.keyAlias, state.password)
    }
  }

  const handleIssuerDNClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      setMethod(MethodName.GetIssuerDN)
      client.GetIssuerDN(state.alias, state.path, state.keyAlias, state.password)
    }
  }

  if (!ready) {
    return <Error />
  }

  return (
    <div className='App'>
      <Status
        ready={ready}
      />
      <StorageAlias
        selected={state.alias}
        onChange={handleAliasChange}
      />
      <StoragePath
        path={state.path}
      />
      <Password
        onChange={handlePasswordChange}
      />
      <KeyType
        selected={state.keyType}
        onChange={handleKeyTypeChange}
      />
      <KeyList
        keys={state.keys}
        onChange={handleKeyAliasChange}
        onClick={handleKeyAliasClick}
      />
      <Locale
        selected={state.lang}
        onChange={handleLangChange}
        onClick={handleLangClick}
      />
      <NotBefore
        value={state.notBefore}
        onClick={handleNotBeforeClick}
      />
      <NotAfter
        value={state.notAfter}
        onClick={handleNotAfterClick}
      />
      <SubjectDN
        value={state.subjectDN}
        onClick={handleSubjectDNClick}
      />
      <IssuerDN
        value={state.issuerDN}
        onClick={handleIssuerDNClick}
      />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default App
