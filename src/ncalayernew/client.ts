import Response from "./response"
import { Method } from "./constants"

type Callback = (resp: Response) => void

type Payload = {
  method: Method
  args: any[]
}

class Client {
  private ws: WebSocket | null = null
  private cb: Callback = (resp: Response) => {}

  version: string = ""

  constructor(ws: WebSocket) {
    if (ws === undefined || ws?.readyState === WebSocket.CONNECTING) return

    this.ws = ws
    this.ws.onmessage = e => {
      if (e.data === "--heartbeat--") return

      const data = JSON.parse(e.data)
      if (data) {
        if (data.result && data.result.version) {
          this.version = data.result.version
        } else {
          this.cb(new Response(data.result, data.secondResult, data.errorCode))
        }
      }
    }
  }

  private send(data: Payload): Method {
    this.ws!.send(JSON.stringify(data))
    return data.method
  }

  browseKeyStore(
    storageName: string,
    fileExtension: string,
    currentDirectory: string,
    callback: Callback
  ): Method {
    this.cb = callback
    return this.send({
      method: Method.BrowseKeyStore,
      args: [storageName, fileExtension, currentDirectory],
    })
  }
}

export default Client
