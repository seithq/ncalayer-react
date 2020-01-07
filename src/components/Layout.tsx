import React from "react"
import Error from "./Error"

interface LayoutProps {
  ready: boolean
}

const Layout: React.FC<LayoutProps> = ({ ready, children }) => {
  if (!ready) {
    return <Error />
  }
  return (
    <div className="bg-gray-200 h-full py-8">
      <div
        className={`
        container mx-auto rounded shadow-2xl
        bg-white
        antialiased font-sans
        tracking-wide leading-relaxed
        text-gray-800 text-sm
        w-4/6
        px-4
        py-2
      `}
      >
        {children}
      </div>
    </div>
  )
}

export default Layout
