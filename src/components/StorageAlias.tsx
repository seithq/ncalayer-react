import React from "react"
import AppState from "../state"
import Client, { Response } from "@seithq/ncalayer"
import { isNone } from "../helper"
import Label from "./Fields/Label"
import Select from "./Fields/Select"

interface StorageAliasProps {
  client: Client
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const StorageAlias: React.FC<StorageAliasProps> = ({
  client,
  state,
  setState,
}) => {
  const handleAliasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isNone(e.target.value)) {
      const alias = e.target.value

      client.browseKeyStore(alias, "P12", state.path, (resp: Response) => {
        if (resp.isOk()) {
          setState({
            ...state,
            alias: alias,
            method: client.method,
            path: resp.getResult(),
          })
        }
      })
    }
  }

  return (
    <div className="StorageAlias">
      <Label>Тип хранилища ключа</Label>
      <Select onChange={handleAliasChange} value={state.alias}>
        <option value="NONE">-- Выберите тип --</option>
        <option value="PKCS12">Ваш Компьютер</option>
        <option value="AKKaztokenStore">Казтокен</option>
        <option value="AKKZIDCardStore">Личное Удостоверение</option>
        <option value="AKEToken72KStore">EToken Java 72k</option>
        <option value="AKJaCartaStore">AK JaCarta</option>
      </Select>
    </div>
  )
}

export default StorageAlias
