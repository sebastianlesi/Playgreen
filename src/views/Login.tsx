import React from "react";
import { InputText } from "../components/inputs/InputText";
import { Typography } from "../components/typography/Typography";
import { colors } from "../styles/colors";
import { size } from "../styles/typography";
import { BasicButton } from "../components/button/BasicButton";
import Grid from "../layouts/Grid";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = (): JSX.Element => {
  //hooks
  const navigate = useNavigate();
  return (
    <Grid
      columns="1"
      style={{
        backgroundColor: colors.backgroudColor,
        padding: "5%",
        height: "77vh",
        gridColumnGap: "16px",
      }}
    >
      <>
        <Typography
          fontSize={size.large.fontsize}
          fontWeight={size.large.fontweight}
          lineHeight={size.large.lineheight}
        >
          Welcome
        </Typography>
        <Typography
          fontSize={size.medium.fontsize}
          fontWeight={size.medium.fontweight}
          lineHeight={size.medium.lineheight}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <InputText placeholder="User" />
        <InputText placeholder="Password" />

        <Typography
          fontSize={size.small.fontsize}
          fontWeight={size.small.fontweight}
          lineHeight={size.small.lineheight}
        >
          Forgot your password?
        </Typography>
        <Grid columns="3">
          <BasicButton
            backgroundColor={colors.primaryColor}
            degradeBackgroundColor={colors.degradePrimaryColor}
            onClick={() => {
              navigate("service/option");
            }}
          >
            Login
          </BasicButton>
        </Grid>
      </>
    </Grid>
  );
};
