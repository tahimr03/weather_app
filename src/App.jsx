import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("please enter a city");
      setWeather(null);
      return;
    }

    const apiKey = "PASTE_YOUR_NEW_API_KEY_HERE";

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`
      );

      const data = await res.json();

      if (data.error) {
        setError("location not found");
        setWeather(null);
        return;
      }

      setWeather(data);
    } catch (err) {
      console.log(err);
      setError("api request failed");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-500 flex flex-col items-center justify-center px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-black">Weather App</h1>
      </header>

      <section className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-sky-400"
        />

        <button
          onClick={fetchWeather}
          className="mt-4 w-full rounded-xl bg-sky-500 px-4 py-3 text-white font-semibold hover:bg-sky-600"
        >
          Get Weather
        </button>

        {loading && <p className="mt-4 text-slate-600">Loading...</p>}

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {weather && (
          <div className="mt-6 rounded-xl bg-slate-100 p-4">
            <h2 className="text-2xl font-bold">
              {weather.location.name}, {weather.location.region}
            </h2>
            <p className="text-slate-700">{weather.location.country}</p>

            <div className="mt-4 flex items-center gap-4">
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />
              <div>
                <p className="text-3xl font-bold">{weather.current.temp_c}°C</p>
                <p className="text-slate-700">{weather.current.condition.text}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-slate-700">
              <p>Feels like: {weather.current.feelslike_c}°C</p>
              <p>Humidity: {weather.current.humidity}%</p>
              <p>Wind: {weather.current.wind_kph} kph</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;