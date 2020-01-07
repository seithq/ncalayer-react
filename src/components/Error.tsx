import React from "react"

const Error: React.FC = () => {
  return (
    <div className="Error">
      <div className="antialiased font-sans bg-gray-100 flex h-screen">
        <div className="flex flex-col m-auto bg-red-400 rounded shadow-2xl text-center text-white p-8">
          <svg
            className="w-16 fill-current self-center"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z" />
          </svg>
          <span className="font-bold text-3xl tracking-wider">
            Ошибка при подключении к прослойке.
          </span>
          <span className="font-semibold text-lg">
            Убедитесь что программа запущена и{" "}
            <span
              className="font-bold text-gray-900 cursor-pointer"
              onClick={e => {
                window.location.reload()
              }}
            >
              перезагрузите страницу.
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Error
