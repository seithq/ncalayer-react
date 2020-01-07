import React from "react"
import Label from "./Fields/Label"
import Input from "./Fields/Input"

interface StoragePathProps {
  path: string
}

const StoragePath: React.FC<StoragePathProps> = ({ path }) => {
  return (
    <div className="StoragePath">
      <Label>Путь хранилища ключа</Label>
      <Input type="text" readOnly value={path} />
    </div>
  )
}

export default StoragePath
