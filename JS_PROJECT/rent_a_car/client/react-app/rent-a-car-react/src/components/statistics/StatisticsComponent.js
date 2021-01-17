import React from "react";
import socketIOClient from "socket.io-client";

import { CanvasJSChart } from "canvasjs-react-charts";

const config = require("../../config/config");
const APIURL = config.get("apiUrl");

const socket = socketIOClient(APIURL);

let carData = {};
let carsArray = [];
let xValue = 0;

class StatisticsComponent extends React.Component {
  constructor() {
    super();

    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    this.initWebSocketClient();
    this.updateChart();
  }

  initWebSocketClient() {
    socket.on("statistics_update", (data) => {
      console.log("statistics updated " + data);
      carData = { x: Number(xValue), y: Number(data.carCount) };
      console.log(carData);
      //chart
      this.updateChart(carData.y);
    });
  }

  updateChart(y) {
    if (this.chart !== undefined) {
      xValue += 1;
      carsArray.push({
        x: Number(xValue),
        y: Number(y),
      });

      this.chart.render();
    }
  }

  render() {
    const options = {
      zoomEnabled: true,
      theme: "light2",
      title: {
        text: "Rented cars chart",
      },
      axisX: {
        title: "Time",
      },
      axisY: {
        title: "Rented cars count",
        viewportMinimum: 0,
        viewportMaximum: 100,
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        fontSize: 18,
        fontColor: "dimGrey",
      },
      data: [
        {
          type: "spline",
          xValueFormatString: "####",
          yValueFormatString: "########.#########",
          showInLegend: true,
          dataPoints: carsArray,
        },
      ],
    };

    return (
      <div>
        <div className="float-child">
          <CanvasJSChart
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
        </div>
      </div>
    );
  }
}

export default StatisticsComponent;
