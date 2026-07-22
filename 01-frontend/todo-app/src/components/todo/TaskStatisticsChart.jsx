import React from "react";
import Chart from "react-apexcharts";

export default function TaskStatisticsChart() {
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Completed", "Pending"],
    colors: ["#22C55E", "#F59E0B"],
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Progress",
              formatter: () => "58%",
            },
          },
        },
      },
    },
  };

  const series = [7, 5];

  return <Chart options={options} series={series} type="donut" height={280} />;
}
