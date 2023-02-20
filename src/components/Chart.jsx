import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { HistoricalChart } from "../api/coinGeckoApi";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ id }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useContext(CurrencyContext);

  console.log(historicalData);

  useEffect(() => {
    getHistorialData();
    // eslint-disable-next-line
  }, [id, days]);

  const getHistorialData = async () => {
    const { data } = await axios(HistoricalChart(id, days, currency));

    setHistoricalData(data.prices);
  };

  /////////// Chartjs///////////////////
  ChartJS.defaults.color = "white";
  const data = {
    labels: historicalData.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;

      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: historicalData.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: "#6e46ff",
        backgroundColor: "#3104b8",
        // borderWidth: "10px",
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
