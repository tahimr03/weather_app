import { useEffect, useState } from "react";

function App() {
  const apiKey = "ENTER YOUR API KEY HERE";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rankSuggestions = (results, searchText) => {
    const search = searchText.trim().toLowerCase();

    return results
      .map((item) => {
        const name = item.name?.toLowerCase() || "";
        const region = item.region?.toLowerCase() || "";
        const country = item.country?.toLowerCase() || "";

        let priority = 999;

        if (name.startsWith(search)) {
          priority = 1;
        } else if (region.startsWith(search)) {
          priority = 2;
        } else if (country.startsWith(search)) {
          priority = 3;
        } else if (name.includes(search)) {
          priority = 4;
        } else if (region.includes(search)) {
          priority = 5;
        } else if (country.includes(search)) {
          priority = 6;
        }

        return { ...item, priority };
      })
      .filter((item) => item.priority !== 999)
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }

        return a.name.localeCompare(b.name);
      });
  };

  const fetchSuggestions = async (searchText) => {
    if (!searchText.trim() || searchText.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchText}`
      );
      const data = await res.json();

      if (!Array.isArray(data)) {
        setSuggestions([]);
        return;
      }

      const ranked = rankSuggestions(data, searchText);
      setSuggestions(ranked.slice(0, 8));
    } catch (err) {
      console.log(err);
      setSuggestions([]);
    }
  };

  const fetchWeather = async (selectedCity = city) => {
    if (!selectedCity.trim()) {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity}&days=5`
      );

      const data = await res.json();

      if (data.error) {
        setError("Location not found");
        setWeather(null);
        return;
      }

      setWeather(data);
      setSuggestions([]);
    } catch (err) {
      console.log(err);
      setError("API request failed");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");
      setSuggestions([]);

      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5`
      );

      const data = await res.json();

      if (data.error) {
        setError("Could not get weather for your location");
        setWeather(null);
        return;
      }

      setCity(
        `${data.location.name}, ${data.location.region}, ${data.location.country}`
      );
      setWeather(data);
    } catch (err) {
      console.log(err);
      setError("API request failed");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      () => {
        setLoading(false);
        setError("Location access was denied or unavailable");
      }
    );
  };

  const handleReset = () => {
    setCity("");
    setWeather(null);
    setSuggestions([]);
    setError("");
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(city);
    }, 300);

    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div className="min-h-screen bg-sky-500 flex flex-col items-center justify-center px-4 py-8">
   <div className="w-full max-w-3xl mb-4">
  <p className="text-white text-sm font-medium">Tahim Roshid's</p>
</div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Forecastly</h1>
      </header>

      <section className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg relative">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-sky-400"
          />

          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg z-50">
              {suggestions.map((item) => (
                <li
                  key={`${item.id}-${item.name}-${item.region}`}
                  onClick={() => {
                    const selected = `${item.name}, ${item.region}, ${item.country}`;
                    setCity(selected);
                    setSuggestions([]);
                    fetchWeather(selected);
                  }}
                  className="cursor-pointer px-4 py-3 text-slate-700 hover:bg-sky-100"
                >
                  {item.name}, {item.region}, {item.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleCurrentLocation}
            className="w-full rounded-xl bg-sky-500 px-4 py-3 text-white font-semibold hover:bg-sky-600"
          >
            Use Current Location
          </button>

          <button
            onClick={handleReset}
            className="w-full rounded-xl bg-slate-500 px-4 py-3 text-white font-semibold hover:bg-slate-600"
          >
            Reset
          </button>
        </div>

        {loading && <p className="mt-4 text-slate-600">Loading...</p>}

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {weather && (
          <div className="mt-6 space-y-6">
            <div className="rounded-xl bg-slate-100 p-4">
              <h2 className="text-2xl font-bold text-black">
                {weather.location.name}, {weather.location.region}
              </h2>
              <p className="text-slate-700">{weather.location.country}</p>

              <div className="mt-4 flex items-center gap-4 justify-center">
                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                />
                <div>
                  <p className="text-3xl font-bold">{weather.current.temp_c}°C</p>
                  <p className="text-slate-700">
                    {weather.current.condition.text}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-1 text-slate-700">
                <p>Feels like: {weather.current.feelslike_c}°C</p>
                <p>Humidity: {weather.current.humidity}%</p>
                <p>Wind: {weather.current.wind_kph} kph</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {weather.forecast.forecastday.map((day) => (
                  <div
                    key={day.date}
                    className="rounded-xl bg-white p-4 shadow text-center"
                  >
                    <p className="font-semibold text-slate-800">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>

                    <p className="text-sm text-slate-500">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    <div className="flex justify-center mt-2">
                      <img
                        src={day.day.condition.icon}
                        alt={day.day.condition.text}
                      />
                    </div>

                    <p className="mt-2 font-medium text-slate-700">
                      {day.day.condition.text}
                    </p>

                    <p className="mt-2 text-slate-800">
                      High: {day.day.maxtemp_c}°C
                    </p>
                    <p className="text-slate-800">
                      Low: {day.day.mintemp_c}°C
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      Rain: {day.day.daily_chance_of_rain}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;