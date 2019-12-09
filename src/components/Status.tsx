import React from 'react'

interface StatusProps {
  ready: boolean
}

const Status: React.FC<StatusProps> = ({ ready }) => {
  return (
    <div className='Status'>
      <span>Ready: {(ready) ? 'YES' : 'NO'}</span>
    </div>
  )
}

export default Status
