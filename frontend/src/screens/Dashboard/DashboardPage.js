import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { Bar } from "react-chartjs-2";

import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [songs, setsongs] = useState([]);
  const [label, setLabel] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3030/api/genre/songscount")
      .then(({ data }) => {
        data?.map((song) => {
          setLabel((labels) => [...labels, song._id]);
          setsongs((songs) => [...songs, song.songs]);
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Doughnut
      data={{
        labels: label,
        datasets: [
          {
            label: "# of Votes",
            data: songs,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};

export default DashboardPage;
