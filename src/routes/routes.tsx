import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../views/Login";
import { GeneralLayout } from "../layouts/GeneralLayout";
import { Match } from "../views/Match";
import { History } from "../views/History";
import { Signup } from "../views/Signup";

export const RoutesTree: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="service" element={<GeneralLayout />}>
          <Route path="option" element={<Match/>} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
