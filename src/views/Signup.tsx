import React from "react";
import { InputText } from "../components/inputs/InputText";
import { Typography } from "../components/typography/Typography";
import { colors } from "../styles/colors";
import { size } from "../styles/typography";
import { BasicButton } from "../components/button/BasicButton";
import Grid from "../layouts/Grid";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGEXP } from "../utils/regexp";
import { doc, setDoc } from "firebase/firestore";

export const Signup: React.FC = (): JSX.Element => {
  //hooks
  const navigate = useNavigate();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("*Este campo es obligatorio")
      .min(8, "Mínimo 8 caracteres")
      .test("upperCase", "*Al menos una letra mayúscula", function (value) {
        if (!!value) {
          const schema = yup.string().matches(REGEXP.ONE_UPPER_LETTER);
          return schema.isValidSync(value);
        }
        return true;
      })
      .test("lowerCase", "*Al menos una letra minúscula", function (value) {
        if (!!value) {
          const schema = yup.string().matches(REGEXP.ONE_LOWER_LETTER);
          return schema.isValidSync(value);
        }
        return true;
      })
      .test("number", "*Al menos un número", function (value) {
        if (!!value) {
          const schema = yup.string().matches(REGEXP.ONE_NUMBER);
          return schema.isValidSync(value);
        }
        return true;
      })
      .test(
        "specialChar",
        "*Al menos un caracter especial (#?!@$%^&*-)",
        function (value) {
          if (!!value) {
            const schema = yup.string().matches(REGEXP.ONE_SPECIAL_CHAR);
            return schema.isValidSync(value);
          }
          return true;
        }
      ),
    password2: yup
      .string()
      .required("*Este campo es obligatorio")
      .oneOf([yup.ref("password")], "*La contraseña no coincide"),
    email: yup
      .string()
      .email("*Este campo debe ser un correo válido")
      .required("*Este campo es requerido"),
    email2: yup
      .string()
      .email("*Este campo debe ser un correo válido")
      .required("*Este campo es requerido")
      .oneOf([yup.ref("email")], "*El correo no coincide"),
    FirstName: yup
      .string()
      .required("*Este campo es obligatorio")
      .matches(REGEXP.ONLY_LETTERS, { message: "*Solo debe incluir letras" }),
    SecondName: yup.string().matches(REGEXP.ONLY_LETTERS, {
      message: "*Solo debe incluir letras",
      excludeEmptyString: true,
    }),
    LastName: yup
      .string()
      .required("*Este campo es obligatorio")
      .matches(REGEXP.ONLY_LETTERS, { message: "*Solo debe incluir letras" }),
    SurName: yup
      .string()
      .notRequired()
      .test("SurName", "*Solo se permiten letras", function (value) {
        if (!!value) {
          const schemaNaturalPerson = yup.string().matches(REGEXP.ONLY_LETTERS);
          return schemaNaturalPerson.isValidSync(value);
        }
        return true;
      }),
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
  const handleLoginRequest = async ({
    FirstName,
    SecondName,
    LastName,
    SurName,
    email,
    password,
  }: any) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setDoc(doc(db, "users", user.uid), {
          FirstName,
          SecondName,
          LastName,
          SurName,
          email,
          history: [],
          uid: user.uid,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userId", user.uid);
        navigate("/service/option");
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
      <form onSubmit={handleSubmit(handleLoginRequest)}>
        <Typography
          fontSize={size.large.fontsize}
          fontWeight={size.large.fontweight}
          lineHeight={size.large.lineheight}
        >
          Sign up
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
          <InputText placeholder="First Name" {...register("FirstName")} />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.FirstName?.message || ""}`}
          </div>
          <InputText placeholder="Second Name" {...register("SecondName")} />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.SecondName?.message || ""}`}
          </div>
          <InputText placeholder="Last Name" {...register("LastName")} />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.LastName?.message || ""}`}
          </div>
          <InputText placeholder="Sur Name" {...register("SurName")} />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.SurName?.message || ""}`}
          </div>
          <InputText placeholder="email" {...register("email")} />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.email?.message || ""}`}
          </div>
          <InputText placeholder="email confirmation" {...register("email2")} />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.email2?.message || ""}`}
          </div>
          <InputText
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.password?.message || ""}`}
          </div>
          <InputText
            type="password"
            placeholder="password confirmation"
            {...register("password2")}
          />
          <div style={{ border: "1px sollid red" }}>
            {`${errors.password2?.message || ""}`}
          </div>
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
            onClick={() => {
              navigate(-1);
            }}
            style={{ padding: "5%" }}
          >
            Cancelar
          </BasicButton>
          <BasicButton
            backgroundColor={colors.primaryColor}
            degradeBackgroundColor={colors.degradePrimaryColor}
            type="submit"
            style={{ padding: "5%" }}
          >
            Registrar
          </BasicButton>
        </div>
      </form>
    </Grid>
  );
};
