import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import { Card, CardContent } from "@material-ui/core";
import { defaultMapCenter } from "./utilities";
import { connect } from "react-redux";
import {
  fetchWorldwideData,
  fetchCountriesData,
} from "./redux/actions/fetchActions";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App({
  currCountry,
  currType,
  fetchWorldwideData,
  fetchCountriesData,
}) {
  useEffect(() => {
    fetchWorldwideData();
    fetchCountriesData();
  }, [fetchWorldwideData, fetchCountriesData]);
  return (
    <div className="app">
      <div className="app__left">
        {/* HEADER */}
        <Header />
        {/* InfoBoxes */}
        <div className="app__stats">
          {/* InfoBox title="cases" */}
          <InfoBox
            title="Coronavirus Cases"
            cases={currCountry?.todayCases}
            total={currCountry?.cases}
            type="cases"
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
            cases={currCountry?.todayRecovered}
            total={currCountry?.recovered}
            type="recovered"
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
            cases={currCountry?.todayDeaths}
            total={currCountry?.deaths}
            type="deaths"
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
        <Map />
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country</h3>
            {/* Table */}
            <Table />
            {/* Graph */}
            <LineGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currCountry: state.countries.currCountry,
    currType: state.misc.currType,
  };
};

const mapDispatchToProps = {
  fetchWorldwideData: fetchWorldwideData,
  fetchCountriesData: fetchCountriesData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
