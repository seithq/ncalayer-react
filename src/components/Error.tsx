import React from "react"

const Error: React.FC = () => {
  return (
    <div className="Error">
      <span>Ошибка при подключении к прослойке.</span>
      <br />
      <span>
        Убедитесь что программа запущена и{" "}
        <span
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={e => {
            window.location.reload()
          }}
        >
          перезагрузите страницу.
        </span>
      </span>
    </div>
  )
}

export default Error
