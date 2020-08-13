import React, { useState } from "react";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import { Card, CardContent } from "@material-ui/core";
import "./App.css";
import "leaflet/dist/leaflet.css";

const defaultMapCenter = { lat: 34.80746, lng: -40.4796 };

function App() {
  const [countries, setCountries] = useState([]); //REACT HOOK
  const [currCountry, setCurrCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState({});
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [currType, setCurrType] = useState("cases");

  return (
    <div className="app">
      <div className="app__left">
        {/* HEADER */}
        <Header
          countries={countries}
          currCountry={currCountry}
          defaultMapCenter={defaultMapCenter}
          setCountries={setCountries}
          setCurrCountry={setCurrCountry}
          setCountryInfo={setCountryInfo}
          setTableData={setTableData}
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
          setMapCountries={setMapCountries}
        />
        {/* InfoBoxes */}
        <div className="app__stats">
          {/* InfoBox title="cases" */}
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            type="cases"
            setCurrType={setCurrType}
            style={
              currType === "cases"
                ? {
                    borderTop: "5px solid #3D94CD",
                    backgroundColor: "#EEF0F9",
                  }
                : {}
            }
            casesColor="#3D94CD"
          ></InfoBox>
          {/* InfoBox title="recovered" */}
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            type="recovered"
            setCurrType={setCurrType}
            style={
              currType === "recovered"
                ? {
                    borderTop: "5px solid #7dd71d",
                    backgroundColor: "#F1FBF2",
                  }
                : {}
            }
            casesColor="#7dd71d"
          ></InfoBox>
          {/* InfoBox title="deaths" */}
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            type="deaths"
            setCurrType={setCurrType}
            style={
              currType === "deaths"
                ? {
                    borderTop: "5px solid #fb4443",
                    backgroundColor: "#F9EEEE",
                  }
                : {}
            }
            casesColor="#fb4443"
          ></InfoBox>
        </div>

        {/* Map */}
        <Map
          countries={mapCountries}
          casesType={currType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country</h3>
            {/* Table */}
            <Table countries={tableData} />
            {/* Graph */}
            <LineGraph casesType={currType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
