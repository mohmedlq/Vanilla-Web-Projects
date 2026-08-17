class WeatherServices {
  constructor() {
    this.GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
    this.FC_URL = "https://api.open-meteo.com/v1/forecast";
  }

  async apiFetchJson(url, signal) {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} (${res.statusText})`);
    return res.json();
  }

  async geocodeCity(name, signal) {
    const url = new URL(this.GEO_URL);
    url.searchParams.set("name", name);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");

    const data = await this.apiFetchJson(url, signal);

    if (!data.results || data.results.length === 0) {
      throw new Error(`City not found: ${name}`);
    }

    return data.results[0];
  }

  async getForecast(lat, lon, signal) {
    const url = new URL(this.FC_URL);
    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lon));
    url.searchParams.set(
      "current",
      "temperature_2m,relative_humidity_2m,wind_speed_10m"
    );
    url.searchParams.set(
      "daily",
      "temperature_2m_min,temperature_2m_max,precipitation_sum"
    );
    url.searchParams.set("timezone", "auto");

    return this.apiFetchJson(url, signal);
  }
}

class UIController {
  constructor() {
    this.elements = {
      city: document.getElementById("city"),
      btnSearch: document.getElementById("btnSearch"),
      loading: document.getElementById("loading"),
      error: document.getElementById("error"),
      results: document.getElementById("results"),
      placeName: document.getElementById("placeName"),
      placeMeta: document.getElementById("placeMeta"),
      tempNow: document.getElementById("tempNow"),
      humidityPill: document.getElementById("humidityPill"),
      windPill: document.getElementById("windPill"),
      timeMeta: document.getElementById("timeMeta"),
      forecastBody: document.getElementById("forecastBody"),
    };
  }

  setLoading(isLoading) {
    this.elements.loading.style.display = isLoading ? "flex" : "none";
    this.elements.btnSearch.disabled = isLoading;
  }

  setError(message) {
    if (!message) {
      this.elements.error.style.display = "none";
      this.elements.error.textContent = "";
      return;
    }
    this.elements.error.style.display = "block";
    this.elements.error.textContent = message;
  }

  render(place, data) {
    this.elements.results.style.display = "grid";
    this.elements.placeName.textContent = `${place.name}, ${place.country}`;
    this.elements.placeMeta.textContent = `Lat/Lon: ${place.latitude}, ${place.longitude}`;

    const t = data.current.temperature_2m;
    const tUnit = data.current_units.temperature_2m;
    this.elements.tempNow.textContent = `${t}${tUnit}`;

    this.elements.humidityPill.textContent = `Humidity: ${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}`;
    this.elements.windPill.textContent = `Wind: ${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;
    this.elements.timeMeta.textContent = `Local time: ${data.current.time} (${data.timezone})`;

    const days = data.daily.time;

    this.elements.forecastBody.innerHTML = days
      .map((day, i) => {
        const min = data.daily.temperature_2m_min[i];
        const max = data.daily.temperature_2m_max[i];
        const rain = data.daily.precipitation_sum[i];

        const minU = data.daily_units.temperature_2m_min;
        const maxU = data.daily_units.temperature_2m_max;
        const rainU = data.daily_units.precipitation_sum;

        return `
          <tr>
            <td>${day}</td>
            <td>${min}${minU}</td>
            <td>${max}${maxU}</td>
            <td>${rain} ${rainU}</td>
          </tr>
        `;
      })
      .join("");
  }
}

class WeatherApp {
  constructor() {
    this.api = new WeatherServices();
    this.ui = new UIController(); 
    this.currentController = null;
    this.LastSearch=localStorage.getItem("Last Search")||"Mecca";

    this.initEvents();
  }

  initEvents() {
    this.ui.elements.btnSearch.addEventListener("click", () => {
      const name = this.ui.elements.city.value.trim();

      if (!name) return this.ui.setError("❌ Please enter a city name.");

      this.runSearch(name);
    });

    this.ui.elements.city.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.ui.elements.btnSearch.click();
    });

   
    
    
    this.ui.elements.city.value = this.LastSearch;
    this.runSearch(this.LastSearch);
  }

  async runSearch(cityName) {
    if (this.currentController) this.currentController.abort();

    this.currentController = new AbortController();

    this.ui.setError("");
    this.ui.setLoading(true);

    try {
      const place = await this.api.geocodeCity(
        cityName,
        this.currentController.signal 
      );

      const data = await this.api.getForecast(
        place.latitude,
        place.longitude,
        this.currentController.signal 
      );
      localStorage.setItem("Last Search",cityName);
      this.ui.render(place, data);
    } catch (err) {
      if (err.name === "AbortError") return;

      this.ui.setError(`❌ ${err.message}`);
      this.ui.elements.results.style.display = "none";
    } finally {
      this.ui.setLoading(false);
    }
  }
}

const App = new WeatherApp();