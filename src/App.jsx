import { useState } from 'react'


function App() {
  return (
    <div className="min-h-screen bg-sky-500 flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-black">Weather App</h1>
      </header>

      {/*Input  */}
      <section className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="Enter city name"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-sky-400"
        />
      </section>
    </div>
  )
}

export default App
