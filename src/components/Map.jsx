import React, { useEffect } from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./../styles/Map.css";
import { connect } from "react-redux";
import { defaultMapCenter } from "./../utilities";

const casesTypeColors = {
  cases: {
    hex: "#3D94CD",
    multiplier: 300000,
  },

  recovered: {
    hex: "#7dd71d",
    multiplier: 400000,
  },

  deaths: {
    hex: "#fb4443",
    multiplier: 3500000,
  },
};

function Map({ countries, casesType, mapData }) {
  // useEffect(() => {
  //   console.log(mapData);
  // }, [mapData]);

  //JUST SPACE MY MAN
  const displayCircles = (casesType = "cases") => {
    return countries?.countries?.map((country) => {
      return (
        <Circle
          key={country.country}
          center={
            country.countryInfo
              ? [country.countryInfo?.lat, country.countryInfo?.long]
              : defaultMapCenter
          }
          fillOpacity={0.4}
          color={casesTypeColors[casesType].hex}
          fillColor={casesTypeColors[casesType].hex}
          radius={2}
          radius={Math.sqrt(
            country[casesType] * casesTypeColors[casesType].multiplier
          )}
        >
          <Popup className="map__popup">
            <div>
              <div
                className="map__popupFlag"
                style={{ backgroundImage: `url(${country.countryInfo?.flag})` }}
              ></div>
              <div className="map__popupCountry">
                <strong>{country?.country}</strong>
              </div>
              <div className="map__popupCases">
                Cases: {numeral(country.cases).format("0,0")}
              </div>
              <div className="map__popupRecovered">
                Recovered: {numeral(country.recovered).format("0,0")}
              </div>
              <div className="map__popupDeaths">
                Deaths: {numeral(country.deaths).format("0,0")}
              </div>
            </div>
          </Popup>
        </Circle>
      );
    });
  };

  return (
    <div className="map">
      <LeafletMap
        center={mapData?.lat ? [mapData.lat, mapData.lng] : defaultMapCenter}
        zoom={mapData.zoom}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
        {displayCircles(casesType)}
      </LeafletMap>
    </div>
  );
}

const mapStateToProps = (state) => ({
  countries: state.countries.countries,
  casesType: state.misc.currType,
  mapData: {
    lat: state.countries.mapLat,
    lng: state.countries.mapLng,
    zoom: state.countries.mapZoom,
  },
});

export default connect(mapStateToProps, null)(Map);
