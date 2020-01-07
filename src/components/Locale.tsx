import React from "react"
import AppState from "../state"
import NCALayer from "../ncalayer"

interface LocaleProps {
  client: NCALayer
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const Locale: React.FC<LocaleProps> = ({ client, state, setState }) => {
  const handleLangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, lang: e.target.value })
  }

  const handleLangClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState({ ...state, method: client.SetLocale(state.lang) })
  }

  return (
    <div className="Locale">
      <span>
        Установка языка <strong>(setLocale)</strong>
      </span>
      <br />
      <input
        type="radio"
        name="lang"
        value="kk"
        onChange={handleLangChange}
        checked={state.lang === "kk"}
      />{" "}
      Казахский
      <br />
      <input
        type="radio"
        name="lang"
        value="ru"
        onChange={handleLangChange}
        checked={state.lang === "ru"}
      />{" "}
      Русский
      <br />
      <input
        type="radio"
        name="lang"
        value="en"
        onChange={handleLangChange}
        checked={state.lang === "en"}
      />{" "}
      Английский
      <br />
      <button onClick={handleLangClick}>Сменить язык</button>
    </div>
  )
}

export default Locale
