import React from "react";
import styled from "styled-components";

const GridWrapper = styled.section<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
`;
interface props {
  columns: string;
  children: JSX.Element;
  style?: Object;
}

const Grid: React.FC<props> = ({ columns, children, style }): JSX.Element => {
  return (
    <GridWrapper columns={columns} style={style}>
      {children}
    </GridWrapper>
  );
};

export default Grid;
