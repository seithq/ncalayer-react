import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import { extractKeyAlias, checkInputs } from "../helper"
import Label from "./Fields/Label"
import Button from "./Fields/Button"
import Select from "./Fields/Select"
import Spacer from "./Fields/Spacer"

interface KeyListProps {
  client: NCALayer
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
      setState({
        ...state,
        method: client.GetKeys(
          state.alias,
          state.path,
          state.password,
          state.keyType
        ),
      })
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
