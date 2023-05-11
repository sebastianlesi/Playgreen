import React from "react";
import { colors } from "../styles/colors";
import { Outlet, useNavigate } from "react-router-dom";
import Home from "../assets/Home.svg";
import History from "../assets/History.svg";
import Exit from "../assets/Exit.svg";

export const GeneralLayout: React.FC = (): JSX.Element => {
  //hooks
  const navigate = useNavigate();

  //handle
  const handleLogOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
    navigate("/")
  } ;

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
          <img src={Home} alt="Inicio" onClick={()=>{navigate("/service/option")}}/>
          <img src={History} alt="Historial" onClick={()=>{navigate("/service/history")}} />
          <img src={Exit} alt="Salir" onClick={handleLogOut} />
        </div>
    </div>
  );
};
