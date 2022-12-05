import weatherIcon from "./image/weathericon.png";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const URLkey = "0e736ef75894202417f6b5f755e0545a";

  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");
  function getData(cityName) {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${URLkey}`;
    axios
      .get(apiURL)
      .then((res) => {
        // console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => console.log("error", err));
  }
  function onChangeHandle(e) {
    // console.log(e.target.value)
    setInputCity(e.target.value);
  }
  function handleData() {
    getData(inputCity);
  }
  useEffect(() => {
    getData("peshawar");
  }, []);
  return (
    <div className="col-md-12 ">
      <div className="weather">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid col-md-4 gap-2">
          <input
            type="text"
            className="form-control "
            placeholder="search weather"
            value={inputCity}
            onChange={onChangeHandle}
          />
          <button className="btn btn-primary" onClick={handleData}>
            Search
          </button>
        </div>
      </div>
      <div className="col-md-12 mt-4  ">
        <div className="shadow rounded weatherResult text-center ">
          <img src={weatherIcon} alt="" className="" />
          <h4 className="weatherCity" style={{ fontSize: "35px" }}>
            {data?.name}
          </h4>
          <h5
            className="weatherTemp"
            style={{ fontSize: "55px", fontWeight: "500px" }}
          >
            {(data?.main?.temp - 273.15).toFixed(2)}°C
          </h5>
        </div>
      </div>
    </div>
  );
}

export default App;
