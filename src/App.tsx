import React, { useState, useEffect, useRef } from 'react'
import NCALayer, { MethodName } from './ncalayer'
import Response from './response'
import { isNone, isNullOrEmpty, extractKeyAlias } from './helper'
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
      } else {
        setState({ ...state, keys: [], keyAlias: '' })
        if (resp.IsWrongPasswordWithAttempts()) {
          alert('Неправильный пароль! Количество оставшихся попыток: ' + resp.GetResult())
          return
        }
        if (resp.IsWrongPassword()) {
          alert('Неправильный пароль!')
          return
        }
        if (resp.IsWrongKeyType()) {
          alert('Ключи не найдены. Попробуйте выбрать другой тип ключа')
          return
        }
        alert('Ошибка: ' + resp.GetErrorCode())
      }
    }

    const getNotBeforeCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, notBefore: resp.GetResult() })
      } else {
        if (resp.IsWrongPasswordWithAttempts()) {
          alert('Неправильный пароль! Количество оставшихся попыток: ' + resp.GetResult())
          return
        }
        if (resp.IsWrongPassword()) {
          alert('Неправильный пароль!')
          return
        }
        alert('Ошибка: ' + resp.GetErrorCode())
      }
    }

    const getNotAfterCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, notAfter: resp.GetResult() })
      } else {
        if (resp.IsWrongPasswordWithAttempts()) {
          alert('Неправильный пароль! Количество оставшихся попыток: ' + resp.GetResult())
          return
        }
        if (resp.IsWrongPassword()) {
          alert('Неправильный пароль!')
          return
        }
        alert('Ошибка: ' + resp.GetErrorCode())
      }
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

  if (!ready) {
    return <Error />
  }

  return (
    <div className='App'>
      <Status ready={ready} />
      <StorageAlias selected={state.alias} onChange={(e) => {
        if (!isNone(e.target.value)) {
          setState({ ...state, alias: e.target.value })
          setMethod(MethodName.BrowseKeyStore)
          client.BrowseKeyStore(e.target.value, 'P12', state.path)
        }
      }} />
      <StoragePath path={state.path} />
      <Password onChange={(e) => {
        setState({ ...state, password: e.target.value })
      }} />
      <KeyType selected={state.keyType} onChange={(e) => {
        setState({ ...state, keyType: e.target.value })
      }} />
      <KeyList keys={state.keys}
        onChange={(e) => {
          setState({ ...state, keyAlias: extractKeyAlias(e.target.value) })
        }}
        onClick={(e) => {
          if (isNullOrEmpty(state.path) || isNullOrEmpty(state.alias)) {
            alert('Не выбрано хранилище')
            return
          }
          if (isNullOrEmpty(state.password)) {
            alert('Введите пароль к хранилищу')
            return
          }
          setMethod(MethodName.GetKeys)
          client.GetKeys(state.alias, state.path, state.password, state.keyType)
        }}
      />
      <Locale
        selected={state.lang}
        onChange={(e) => {
          setState({ ...state, lang: e.target.value })
        }}
        onClick={(e) => {
          setMethod(MethodName.SetLocale)
          client.SetLocale(state.lang)
        }}
      />
      <NotBefore value={state.notBefore} onClick={(e) => {
        setMethod(MethodName.GetNotBefore)
        client.GetNotBefore(state.alias, state.path, state.keyAlias, state.password)
      }} />
      <NotAfter value={state.notAfter} onClick={(e) => {
        setMethod(MethodName.GetNotAfter)
        client.GetNotAfter(state.alias, state.path, state.keyAlias, state.password)
      }} />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default App
