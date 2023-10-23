import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

export function AuthRoutes() {

    const userStored = localStorage.getItem('@rocketnotes:user');

    return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
        {!userStored  && <Route path="*" element={<Navigate to="/"/>}/>}
    </Routes>
  );
}
