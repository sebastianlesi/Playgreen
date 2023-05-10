import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import { colors } from "../styles/colors";
import { Outlet } from "react-router-dom";
import Home from "../assets/Home.svg";
import History from "../assets/History.svg";
import Exit from "../assets/Exit.svg";

export const GeneralLayout: React.FC = (): JSX.Element => {
  return (
    <div
      style={{
        backgroundColor: colors.backgroudColor,
      }}
    >
        <Outlet />
        <div
          style={{
            backgroundColor: colors.thirdColor,
            padding: "5%",
            display: "flex",
            justifyContent: "space-evenly",
            margin: "5%",
            borderRadius: "10px"
          }}
        >
          <img src={Home} alt="Inicio" />
          <img src={History} alt="Historial" />
          <img src={Exit} alt="Salir" />
        </div>
    </div>
  );
};
