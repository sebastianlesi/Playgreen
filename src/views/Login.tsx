import React from "react";
import { InputText } from "../components/inputs/InputText";
import { Typography } from "../components/typography/Typography";
import { colors } from "../styles/colors";
import { size } from "../styles/typography";
import { BasicButton } from "../components/button/BasicButton";
import Grid from "../layouts/Grid";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login: React.FC = (): JSX.Element => {
  //hooks
  const navigate = useNavigate();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("*Este campo es obligatorio")
      .min(8, "Mínimo 8 caracteres"),
    email: yup
      .string()
      .email("*Este campo debe ser un correo válido")
      .required("*Este campo es requerido"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //handle
  interface propsLogin {
    email: string;
    password: string;
  }
  const handleLoginRequest = async ({ email, password }: propsLogin) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userId", user.uid);
        navigate("service/option");
      })
      .catch((error) => {
        alert("Usuario y/o contraseña incorrecto");
      });
  };
  return (
    <Grid
      columns="1"
      style={{
        backgroundColor: colors.backgroudColor,
        padding: "5%",
        height: "90vh",
        gridColumnGap: "16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          handleLoginRequest({ email: data.email, password: data.password });
        })}
      >
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <InputText placeholder="User" {...register("email")} />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.email?.message || ""}`}
          </div>
          <InputText
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>

        <div style={{ border: "1px sollid red" }}>
          {`${errors.password?.message || ""}`}
        </div>
        <Typography
          fontSize={size.small.fontsize}
          fontWeight={size.small.fontweight}
          lineHeight={size.small.lineheight}
        >
          Forgot your password?
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <BasicButton
            backgroundColor={colors.primaryColor}
            degradeBackgroundColor={colors.degradePrimaryColor}
            type="submit"
            style={{ padding: "5%" }}
          >
            Login
          </BasicButton>
          <BasicButton
            backgroundColor={colors.primaryColor}
            degradeBackgroundColor={colors.degradePrimaryColor}
            onClick={()=>{navigate("signup")}}
            style={{ padding: "5%" }}
          >
            Sign up
          </BasicButton>
        </div>
      </form>
    </Grid>
  );
};
