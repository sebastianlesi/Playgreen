import React, { useEffect, useState } from "react";
import { Typography } from "../components/typography/Typography";
import { colors } from "../styles/colors";
import { size } from "../styles/typography";
import { useNavigate } from "react-router-dom";
import { getInfoUser } from "../services/UsersService";
import { DocumentData } from "firebase/firestore";
import { CardSports, propsCard } from "../components/card/CardSports";
import Spinner from "../components/loader/Loader";
import dateFormat from "dateformat";

export const History: React.FC = (): JSX.Element => {
  //hooks
  const navigate = useNavigate();

  //states
  const [listHistory, setListHistory] = useState<DocumentData | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //handle
  const handleRequestHistory = async () => {
    try {
      const userId: string = localStorage.getItem("userId") || "";
      const requestHistory: any = await getInfoUser(userId);
      setListHistory(requestHistory.history);
    } catch (error) {
      console.log(error);
    }
  };

  //useeffect
  useEffect(() => {
    handleRequestHistory();
  }, []);

  return (
    <div
      style={{
        backgroundColor: colors.backgroudColor,
        padding: "5%",
        height: "80vh",
        gridColumnGap: "16px",
      }}
    >
      <>
        <Typography
          fontSize={size.large.fontsize}
          fontWeight={size.large.fontweight}
          lineHeight={size.large.lineheight}
        >
          History
        </Typography>
        <Typography
          fontSize={size.medium.fontsize}
          fontWeight={size.medium.fontweight}
          lineHeight={size.medium.lineheight}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography
          fontSize={size.small.fontsize}
          fontWeight={size.small.fontweight}
          lineHeight={size.small.lineheight}
        >
          {`${dateFormat(new Date(),"d mmmm yyyy, h:MM TT")}`}
        </Typography>
        {isLoading ? (
          <Spinner />
        ) : (
          listHistory?.map((option: propsCard, index: number) => (
            <CardSports
              key={option.name+index}
              isLiked={option.isLiked}
              name={option.name}
              imageURL={option.imageURL}
            />
          ))
        )}
      </>
    </div>
  );
};
