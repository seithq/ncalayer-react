import React from 'react'

interface StoragePathProps {
  path: string
}

const StoragePath: React.FC<StoragePathProps> = ({ path }) => {
  return (
    <div className='StoragePath'>
      <span>Путь хранилища ключа:</span>
      <br />
      <input type='text' readOnly value={path} />
    </div>
  )
}

export default StoragePath
