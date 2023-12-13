import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardBarChart({ transactionData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Use a dictionary to accumulate total prices for each product name
    const totalPricesMap = {};
    transactionData.rows.forEach((row) => {
      const { name, total } = row;
      totalPricesMap[name] = (totalPricesMap[name] || 0) + total;
    });

    // Extract product names and total prices from the accumulated totals
    const productNames = Object.keys(totalPricesMap);
    const totalPrices = Object.values(totalPricesMap);

    let config = {
      type: "bar",
      data: {
        labels: productNames,
        datasets: [
          {
            label: "Total Price",
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: totalPrices,
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
        // ... (unchanged)
      },
    };

    let ctx = chartRef.current.getContext("2d");

    // Destroy existing chart if it exists
    if (window.myBar) {
      window.myBar.destroy();
    }

    window.myBar = new Chart(ctx, config);
  }, [transactionData]);

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
