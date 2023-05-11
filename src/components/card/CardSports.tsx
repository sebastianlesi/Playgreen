import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import Heart from "../../assets/Heart.svg";
import Cancel from "../../assets/Cancel.svg";
import { Typography } from "../typography/Typography";
import { size } from "../../styles/typography";

export interface propsCard {
  isLiked: boolean;
  name: string;
  imageURL: string;
}

export const CardSports: React.FC<propsCard> = ({
  isLiked,
  name,
  imageURL,
}): JSX.Element => {
  const ContainerGeneral = styled.div`
    background: ${colors.thirdColor};
    border-radius: 12px;
    display: flex;
  `;
  const ContainerImage = styled.div`
    background: ${colors.thirdColor};
    border: 1px solid black;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1%;
    width: 100%
  `;
  const ContainerIcon = styled.div`
    display: flex;
    align-items: center;
    padding: 5%;
  `;
  return (
    <ContainerGeneral>
      <ContainerImage>
        <Typography
          fontSize={size.medium.fontsize}
          fontWeight={size.medium.fontweight}
          lineHeight={size.medium.lineheight}
        >
          {name}
        </Typography>
        <img src={imageURL} alt="Icon sport" width={100} height={100}/>
      </ContainerImage>
      <ContainerIcon>
      <img src={isLiked ? Heart : Cancel} alt="Like" width={50} height={50}/></ContainerIcon>
    </ContainerGeneral>
  );
};
