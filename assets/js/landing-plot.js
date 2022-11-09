var ctx = document.getElementById("chart-bars").getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["2018", "2019", "2020", "2021"],
    datasets: [
      {
        label: "Prevalence of severe or moderate food insecurity.",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "#03D3AF",
        data: [25, 25.4, 29.5, 29.3],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {},
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: true,
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 500,
          beginAtZero: true,
          padding: 15,
          font: {
            size: 14,
            family: "Open Sans",
            style: "normal",
            lineHeight: 2,
          },
          color: "#0f0f0f",
        },
      },
      x: {
        grid: {
          drawBorder: true,
          display: true,
          drawOnChartArea: false,
          drawTicks: true,
        },
        ticks: {
          display: true,
        },
      },
    },
  },
});
