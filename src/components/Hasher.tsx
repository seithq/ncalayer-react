import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"

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
      <span>
        Получить Хэш данных по указанному алгоритму <strong>(getHash)</strong>
      </span>
      <br />
      <select onChange={handleAlgSelect} defaultValue={state.alg}>
        {options.map(item => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          )
        })}
      </select>
      <br />
      <span>Введите данные для хеширование:</span>
      <br />
      <input type="text" onChange={handleHashDataChange} />
      <br />
      <textarea readOnly value={state.hashed} />
      <br />
      <button onClick={handleHashClick}>Получить хэш</button>
    </div>
  )
}

export default Hasher
