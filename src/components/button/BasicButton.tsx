import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { size } from "../../styles/typography";

export const BasicButton = styled.button<{backgroundColor: string, degradeBackgroundColor: string}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1%;
  border: none;
  background: linear-gradient(
    99deg,
    ${prop=>prop.backgroundColor} 6.69%,
    ${prop=>prop.degradeBackgroundColor} 80.95%
  );
  box-shadow: 0px 4px 30px ${prop=>prop.degradeBackgroundColor};
  border-radius: 25px;
  color: ${colors.thirdColor};
  font-weight: ${size.button.fontweight};
  font-size: ${size.button.fontsize};
  line-height: ${size.button.lineheight};
`;
