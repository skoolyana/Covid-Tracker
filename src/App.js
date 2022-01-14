import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./App.css";

import { MenuItem, FormControl, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./Util";
import LineGraph from "./LineGraph";
import { prettyPrintStat } from "./Util";



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 33, lng: 65 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  
 
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2, //UK,USA
          }));

          const sortedData = sortData(data);

          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        console.log(data.countryInfo.lat)
        console.log(data.countryInfo.long)

        setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long });
      
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 Tracker </h1>

          <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide"> WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}> {country.name}</MenuItem>
            ))}
          </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox  
          isRed
          active={casesType === 'cases'}
            
            onClick={(e) => setCasesType("cases")}
            title="CoronaVirus Cases"
            total={prettyPrintStat(countryInfo.cases)}
            cases={prettyPrintStat(countryInfo.todayCases)}
          ></InfoBox>
          <InfoBox
           active={casesType === 'recovered'}
          onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            total={prettyPrintStat(countryInfo.recovered)}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
          ></InfoBox>
          <InfoBox
          isRed
          active={casesType === 'deaths'}
          onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            total={prettyPrintStat(countryInfo.deaths)}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
          ></InfoBox>
        </div>

        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}></Map>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3> Live Cases By Country</h3>
          <Table countries={tableData}></Table>
          <h3> Worldwide New {casesType}</h3>
          <LineGraph className="app_graph" casesType="cases">
          </LineGraph>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
