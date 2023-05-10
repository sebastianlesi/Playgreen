import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../views/Login";
import { GeneralLayout } from "../layouts/GeneralLayout";
import { Match } from "../views/Match";

export const RoutesTree: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="service" element={<GeneralLayout />}>
          <Route path="option" element={<Match/>} />
          <Route path="history" element={<br />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
