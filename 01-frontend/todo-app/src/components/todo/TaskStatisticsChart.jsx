import React from "react";
import Chart from "react-apexcharts";

export default function TaskStatisticsChart({
  completedTasks,
  pendingTasks,
  progress,
  inProgressTasks,
}) {
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Pending", "In Progress", "Completed"],
    colors: ["#F59E0B", "#3B82F6", "#22C55E"],
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
              label: "Total",
              formatter: () => pendingTasks + inProgressTasks + completedTasks,
            },
          },
        },
      },
    },
  };

  const series = [pendingTasks, inProgressTasks, completedTasks];

  return <Chart options={options} series={series} type="donut" height={260} width="100%" />;

}
