import React from "react"
import AppState from "../state"
import Client, { Response, extractKeyAlias } from "@seithq/ncalayer"
import {
  checkInputs,
  ValidationType,
  handleError,
  isNullOrEmpty,
} from "../helper"
import Label from "./Fields/Label"
import Button from "./Fields/Button"
import Select from "./Fields/Select"
import Spacer from "./Fields/Spacer"

interface KeyListProps {
  client: Client
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const KeyList: React.FC<KeyListProps> = ({ client, state, setState }) => {
  const handleKeyAliasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, keyAlias: extractKeyAlias(e.target.value) })
  }

  const handleKeyAliasClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
    })
    if (ok) {
      client.getKeys(
        state.alias,
        state.path,
        state.password,
        state.keyType,
        (resp: Response) => {
          if (resp.isOk()) {
            const keys: string[] = []
            resp
              .getResult()
              .split("\n")
              .forEach(el => {
                if (isNullOrEmpty(el)) return
                keys.push(el)
              })

            setState({
              ...state,
              method: client.method,
              keys: keys,
              keyAlias: keys.length > 0 ? extractKeyAlias(keys[0]) : "",
            })

            return
          }

          setState({ ...state, keys: [], keyAlias: "" })
          handleError(
            resp,
            ValidationType.Password &&
              ValidationType.PasswordAttemps &&
              ValidationType.KeyType
          )
        }
      )
    }
  }

  return (
    <div className="KeyList">
      <Label>Список ключей</Label>
      <Select onChange={handleKeyAliasChange}>
        {state.keys.map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          )
        })}
      </Select>
      <Spacer point="4" />
      <Button onClick={handleKeyAliasClick}>Обновить список ключей</Button>
    </div>
  )
}

export default KeyList
