import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface chartStatsProps {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options: ApexOptions;
}

// TODO:  fetch value from backend
export const chartStats: chartStatsProps = {
  series: [
    {
      name: "Orders",
      data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
    },
    {
      name: "Sale",
      data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
    },
    {
      name: "Customers",
      data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
    },
  ],
  options: {
    colors: ["#67e8f9", "#fda4af", "#d8b4fe"],
    // plotOptions: {
    //   radius: 30,
    // },
    chart: {
      background: "transparent",
      foreColor: "#d0d2d6",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      curve: ["smooth", "straight", "stepline"],
      lineCap: "butt",
      colors: ["#f0f0f0"],
      width: 0.5,
      dashArray: 0,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      position: "top",
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          chart: {
            height: "450px",
          },
        },
      },
    ],
  },
};

export default function StatsChart() {
  return (
    <div className="w-full lg:flex-1 bg-white/5 rounded-2xl p-2">
      <Chart
        options={chartStats.options}
        series={chartStats.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
