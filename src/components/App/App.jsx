import { Navigate, Route, Routes } from "react-router-dom";
import { refreshThunk } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./App.css";

import PublicRoute from "../../routes/PublicRoute";
import PrivateRoute from "../../routes/PrivateRoute";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import clsx from "clsx";
import {
  selectIsAddModalOpen,
  selectIsEditModalOpen,
} from "../../redux/Modals/slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  const isEditOpen = useSelector(selectIsEditModalOpen);
  const isAddOpen = useSelector(selectIsAddModalOpen);

  return (
    <div className={clsx("app", isEditOpen || (isAddOpen && "block-scroll"))}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
