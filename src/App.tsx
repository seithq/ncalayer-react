import React, { useState, useEffect, useRef } from 'react'
import NCALayer, { MethodName, Response } from './ncalayer'

const isNone = (s: string): boolean => {
  return s === 'NONE'
}

const isNullOrEmpty = (s: string): boolean => {
  return s === null || s === ''
}

const App: React.FC = () => {
  // refs
  const ws = useRef<WebSocket>()

  // state
  const [ready, setReady] = useState(false)
  const [method, setMethod] = useState<MethodName>(MethodName.None)
  const [storagePath, setStoragePath] = useState('')

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
      setReady(true)
    }

    return () => {
      ws.current!.close()
    }
  }, [setReady])

  useEffect(() => {
    ws.current!.onmessage = (e) => {
      if (e.data === '--heartbeat--') {
        return
      }

      const data = JSON.parse(e.data)
      if (data !== null) {
        const resp: Response = {
          result: data.result,
          secondResult: data.secondResult,
          errorCode: data.errorCode,
        }

        switch (method) {
          case MethodName.BrowseKeyStore:
            browseKeyStoreCallback(resp)
            break
          default:
            // tslint:disable-next-line
            console.log(e)
            break
        }
      }
    }
  }, [method])

  // NCALayer client
  const client = new NCALayer(ws.current!)

  // callback functions
  const browseKeyStoreCallback = (resp: Response) => {
    if (isNone(resp.errorCode)) {
      if (!isNullOrEmpty(resp.result)) {
        setStoragePath(resp.result)
      }
    }
  }

  return (
    <div className='App'>
      <div className='Status'>Ready: {(ready) ? 'YES' : 'NO'}</div>
      <div className='StorageAlias'>
        <span>Тип хранилища ключа:</span>
        <br />
        <select onChange={(e) => {
          if (!isNone(e.target.value)) {
            setMethod(MethodName.BrowseKeyStore)
            client.BrowseKeyStore(e.target.value, 'P12', '')
          }
        }}>
          <option value='NONE'>-- Выберите тип --</option>
          <option value='PKCS12'>Ваш Компьютер</option>
          <option value='AKKaztokenStore'>Казтокен</option>
          <option value='AKKZIDCardStore'>Личное Удостоверение</option>
          <option value='AKEToken72KStore'>EToken Java 72k</option>
          <option value='AKJaCartaStore'>AK JaCarta</option>
        </select>
      </div>
      <div className='StoragePath'>
        <span>Путь хранилища ключа:</span>
        <br />
        <input type='text' readOnly value={storagePath} />
      </div>
    </div>
  )
}

export default App
