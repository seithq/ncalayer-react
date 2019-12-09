import React, { useState, useEffect, useRef } from 'react'
import NCALayer, { MethodName, Response } from './ncalayer'
import Error from './components/Error'
import Status from './components/Status'
import StorageAlias from './components/StorageAlias'
import StoragePath from './components/StoragePath'

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
      setReady(false)
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

  if (!ready) {
    return <Error />
  }

  return (
    <div className='App'>
      <Status ready={ready} />
      <StorageAlias
        onChange={(e) => {
          if (!isNone(e.target.value)) {
            setMethod(MethodName.BrowseKeyStore)
            client.BrowseKeyStore(e.target.value, 'P12', '')
          }
        }}
      />
      <StoragePath path={storagePath} />
    </div>
  )
}

export default App
