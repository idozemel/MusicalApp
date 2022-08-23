import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import "./Dashborad.css";
import { useState, useEffect } from "react";
import { configWithToken } from "../../actions/configWithToken";
import Loading from "../../components/Handlers/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    axios
      .get(
        "http://localhost:3030/api/genre/songscount",
        configWithToken(localStorage.getItem("userInfo"))
      )
      .then(({ data }) => {
        data?.map((genre) => {
          return setData((data) => ({
            ...data,
            labels: [...data.labels, genre._id],
            datasets: [
              {
                ...data.datasets[0],
                data: [...data.datasets[0].data, genre.songs],
              },
            ],
          }));
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return data && data?.datasets[0]?.data?.length > 0 ? (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            position: "top",

            labels: {
              font: {
                size: 24,
              },
            },
          },
        },
      }}
    />
  ) : (
    <Loading />
  );
};

export default DashboardPage;
