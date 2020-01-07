import React from "react"
import AppState from "../state"
import Error from "./Error"
import Highlight from "react-highlight.js"

interface LayoutProps {
  state: AppState
  ready: boolean
}

const Layout: React.FC<LayoutProps> = ({ state, ready, children }) => {
  if (!ready) {
    return <Error />
  }
  return (
    <div className="bg-gray-300 h-full py-8">
      <div
        className={`
        container mx-auto rounded shadow-2xl
        bg-white
        antialiased font-sans
        tracking-wide leading-relaxed
        text-gray-800 text-sm
        flex flex-wrap
      `}
      >
        <div className="w-full px-4 mt-4 flex justify-between">
          <div className="flex flex-row bg-green-200 rounded px-4 py-2">
            <span className="mr-2 font-semibold text-green-900">
              Прослойка:
            </span>
            <svg
              className="w-6 fill-current text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2 0v8h16V6H2zm1 1h4v6H3V7zm5 0h4v6H8V7zm5 0h4v6h-4V7z" />
            </svg>
          </div>
          <div className="flex flex-row bg-blue-200 rounded px-4 py-2">
            <span className="mr-2 font-bold text-blue-900">Версия:</span>
            <span className="font-semibold text-blue-900">{state.version}</span>
          </div>
        </div>
        <div className="w-1/2 p-4">{children}</div>
        <div className="w-1/2 p-4">
          <Highlight language="json">
            {JSON.stringify(state, null, 2)}
          </Highlight>
        </div>
      </div>
    </div>
  )
}

export default Layout
