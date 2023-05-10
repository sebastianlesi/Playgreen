import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heart from "../assets/Heart.svg";
import Cancel from "../assets/Cancel.svg";
import { BasicButton } from "../components/button/BasicButton";
import { colors } from "../styles/colors";
import { getRequestListSports } from "../services/SportsServices";
import { CODES } from "../utils/CODES";

export const Match: React.FC = (): JSX.Element => {
  //hooks
  const navigate = useNavigate();

  //states
  const [listSports, setListSports] = useState([]);
  const [randomSport, setRandomSport] = useState([]);
  console.log(listSports)
  console.log(randomSport)

  //Handles
  const handleRequestAllSport = async () => {
    try {
      const requestResponse = await getRequestListSports();
      if (requestResponse.status === CODES.COD_RESPONSE_HTTP_OK) {
        setListSports(requestResponse.data.leagues);
        setRandomSport(requestResponse.data.leagues[Math.floor(Math.random()*requestResponse.data.leagues.length)])
      }
    } catch (error) {
      console.log(error);
    }
  };

  //useeffect
  useEffect(() => {
    handleRequestAllSport();
  }, []);
  return (
    <div>
      <div style={{ width: "100%" }}>
        <img src={Heart} alt="Historial" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "10%",
        }}
      >
        <BasicButton
          backgroundColor={colors.thirdColor}
          degradeBackgroundColor={colors.thirdColor}
          onClick={() => {
            navigate("service/option");
          }}
        >
          <img src={Cancel} alt="Salir" />
        </BasicButton>
        <BasicButton
          backgroundColor={colors.primaryColor}
          degradeBackgroundColor={colors.degradePrimaryColor}
          onClick={() => {
            navigate("service/option");
          }}
        >
          <img src={Heart} alt="Historial" />
        </BasicButton>
      </div>
    </div>
  );
};
