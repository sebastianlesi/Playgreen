import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heart from "../assets/HeartLight.svg";
import Cancel from "../assets/Cancel.svg";
import { BasicButton } from "../components/button/BasicButton";
import { colors } from "../styles/colors";
import { getRequestListSports } from "../services/SportsServices";
import { CODES } from "../utils/CODES";
import Spinner from "../components/loader/Loader";
import { addSportToHistory, propsAddSport } from "../services/UsersService";

export const Match: React.FC = (): JSX.Element => {
  //hooks
  const navigate = useNavigate();

  //states
  const [listSports, setListSports] = useState([]);
  const [randomSport, setRandomSport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Handles
  const handleRequestAllSport = async () => {
    try {
      setIsLoading(true);
      const requestResponse = await getRequestListSports();
      if (requestResponse.status === CODES.COD_RESPONSE_HTTP_OK) {
        setListSports(requestResponse.data.teams);
        setRandomSport(
          requestResponse.data.teams[
            Math.floor(Math.random() * requestResponse.data.teams.length)
          ]
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikedSport = async ({
    idTeam,
    imageURL,
    isLiked,
    name,
  }: propsAddSport) => {
    try {
      setIsLoading(true);
      const uid = localStorage.getItem("userId") || "";
      addSportToHistory({ idTeam, imageURL, isLiked, name, uid });
      setRandomSport(
        listSports[
          Math.floor(Math.random() * listSports.length)
        ]
      );
      setIsLoading(false);
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <img
            src={randomSport?.strTeamBadge}
            alt="Logo equipo"
            width={414}
            height={600}
          />
        )}
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
          style={{ padding: "2%" }}
          onClick={() => {
            handleLikedSport({
              isLiked: false,
              idTeam: randomSport.idTeam,
              imageURL: randomSport.strTeamBadge,
              name: randomSport.strTeam,
            });
          }}
        >
          <img src={Cancel} alt="Salir" />
        </BasicButton>
        <BasicButton
          backgroundColor={colors.primaryColor}
          degradeBackgroundColor={colors.degradePrimaryColor}
          style={{ padding: "5%" }}
          onClick={() => {
            handleLikedSport({
              isLiked: true,
              idTeam: randomSport.idTeam,
              imageURL: randomSport.strTeamBadge,
              name: randomSport.strTeam,
            });
          }}
        >
          <img src={Heart} alt="Historial" />
        </BasicButton>
      </div>
    </div>
  );
};
