import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardBarChart({ transactionData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Use a dictionary to accumulate total prices and prices for each product name
    const totalPricesMap = {};
    const pricesMap = {};
    
    transactionData.rows.forEach((row) => {
      const { name, total, price } = row;
      totalPricesMap[name] = (totalPricesMap[name] || 0) + total;
      pricesMap[name] = price;
    });

    // Extract product names, total prices, and prices from the accumulated totals
    const productNames = Object.keys(totalPricesMap);
    const totalPrices = Object.values(totalPricesMap);
    const prices = productNames.map(name => pricesMap[name]);

    let config = {
      type: "bar",
      data: {
        labels: productNames,
        datasets: [
          {
            label: "Total Sales",
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: totalPrices,
            barThickness: 15,
          },
          {
            label: "Price",
            fill: false,
            backgroundColor: "#DA0C81",
            borderColor: "#DA0C81",
            data: prices,
            barThickness: 15,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
      },
    };

    let ctx = chartRef.current.getContext("2d");

    // Destroy existing chart if it exists
    if (window.myBar) {
      window.myBar.destroy();
    }

    window.myBar = new Chart(ctx, config);
  }, [transactionData])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total orders
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart" ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
