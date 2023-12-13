import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardLineChart({ products }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Create labels and dataset dynamically from products
    const labels = products.map((product) => product.name);
    const datasets = [
      {
        label: 'Stock',
        fill: false,
        backgroundColor: "#fff",
        borderColor: "#fff",
        data: products.map((product) => product.stock),
      },
    ];

    const config = {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                color: "rgba(255,255,255,.7)",
              },
              display: true,
              title: {
                display: false,
                text: "Month",
                color: "white",
              },
              grid: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                color: "rgba(255,255,255,.7)",
              },
              display: true,
              title: {
                display: false,
                text: "Value",
                color: "white",
              },
              grid: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    const ctx = chartRef.current.getContext("2d");

    // Destroy existing chart if it exists
    if (window.myLine) {
      window.myLine.destroy();
    }

    window.myLine = new Chart(ctx, config);
  }, [products]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Stocks value</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart" ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
