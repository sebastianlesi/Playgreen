import React from "react";
import styled from "styled-components";

export const Typography = styled.p<{
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}>`
  font-size: ${(prop) => prop.fontSize};
  font-weight: ${(prop) => prop.fontWeight};
  line-height: ${(prop) => prop.lineHeight};
  display: flex;
  justify-content: center;
`;
