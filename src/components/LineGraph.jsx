import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { connect } from "react-redux";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const caseTypeColors = {
  cases: {
    backgroundColor: "rgba(61, 148, 192, 0.2)",
    borderColor: "#3D94CD",
  },
  recovered: {
    backgroundColor: "rgba(125, 215, 29, 0.2)",
    borderColor: "#7dd71d",
  },
  deaths: {
    backgroundColor: "rgba(251, 68, 67, 0.2)",
    borderColor: "#fb4443",
  },
};

const caseTypeTitles = {
  cases: "Worldwide New Cases Per Day",
  recovered: "Worldwide Recovered Per Day",
  deaths: "Worldwide Deaths Per Day",
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildChartData(data, casesType);
          //   console.log ("chartData", chartData);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className="lineGraph__container">
      <h3 className="lineGraph__title">{caseTypeTitles[casesType]}</h3>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: caseTypeColors[casesType].backgroundColor,
                borderColor: caseTypeColors[casesType].borderColor,
              },
            ],
          }}
        ></Line>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    casesType: state.misc.currType,
  };
};

export default connect(mapStateToProps)(LineGraph);
