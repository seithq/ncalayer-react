import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"
import PlainText from "./Fields/PlainText"
import Label from "./Fields/Label"
import Button from "./Fields/Button"
import Select from "./Fields/Select"
import Input from "./Fields/Input"
import Spacer from "./Fields/Spacer"

const options = [
  {
    value: "SHA1",
    text: "SHA1",
  },
  {
    value: "SHA256",
    text: "SHA256",
  },
  {
    value: "GOST34311",
    text: "GOST34311",
  },
]

interface HasherProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const Hasher: React.FC<HasherProps> = ({ client, state, setState }) => {
  const handleAlgSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, alg: e.target.value })
  }

  const handleHashDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, toHash: e.target.value })
  }

  const handleHashClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState({ ...state, method: client.GetHash(state.toHash, state.alg) })
  }

  return (
    <div className="Hasher">
      <Label method="getHash">
        Получить хэш данных по указанному алгоритму
      </Label>
      <Select onChange={handleAlgSelect} defaultValue={state.alg}>
        {options.map(item => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          )
        })}
      </Select>
      <Label>Введите данные для хеширование</Label>
      <Input type="text" onChange={handleHashDataChange} />
      <Spacer point="4" />
      <PlainText data={state.hashed} />
      <Spacer point="4" />
      <Button onClick={handleHashClick}>Получить хэш</Button>
    </div>
  )
}

export default Hasher
