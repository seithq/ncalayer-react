import React from "react"

interface StatusProps {
  ready: boolean
  version: string
}

const Status: React.FC<StatusProps> = ({ ready, version }) => {
  return (
    <div className="Status">
      <span>
        Ready: {ready ? "YES" : "NO"}, Version: {version}
      </span>
    </div>
  )
}

export default Status
