import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraphBar = ({ graphData, which }) => {
  const barRef = useRef(null);
  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#A28BFF"];

  // Prepare chart data
  let chartDataArray = [];

  if (which === "expenseVsCat") {
    chartDataArray =
      graphData?.transactions
        ?.filter((t) => t.type === "expense")
        ?.reduce((acc, t) => {
          const found = acc.find((item) => item.name === t.category);
          if (found) {
            found.value += t.amount;
          } else {
            acc.push({ name: t.category, value: t.amount });
          }
          return acc;
        }, []) || [];
  } else if (which === "expenseVsData") {
    chartDataArray =
      graphData?.transactions?.reduce((acc, t) => {
        const found = acc.find((item) => item.name === t.type);
        if (found) {
          found.value += t.amount;
        } else {
          acc.push({ name: t.type, value: t.amount });
        }
        return acc;
      }, []) || [];
  }

  // Chart.js data object
  const data = {
    labels: chartDataArray.map((d) => d.name),
    datasets: [
      {
        label: "Expenses",
        data: chartDataArray.map((d) => d.value),
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  // PDF export function
  const handleExportPdf = () => {
    if (!barRef.current) return;
    const chart = barRef.current;
    const imgData = chart.toBase64Image();
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 20, pageWidth, pdfHeight);
    pdf.save("bar-chart.pdf");
  };

  return chartDataArray.length > 0 ? (
    <div className="flex flex-col justify-between items-center w-80">
      <Bar ref={barRef} data={data} options={options} />
      <button
        onClick={handleExportPdf}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Export Chart as PDF
      </button>
    </div>
  ) : (
    <p className="text-sm">No data</p>
  );
};

export default GraphBar;
