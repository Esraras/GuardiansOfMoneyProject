import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { RestrictedRoute } from "../../routes/RestrictedRoute";
import "./App.css";

const RegistrationPage = lazy(() =>
  import("../../pages//RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const DashboardPage = lazy(() =>
  import("../../pages/DashboardPage/DashboardPage")
);

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/DashboardPage"
              component={<RegistrationPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/DashboardPage"
              component={<LoginPage />}
            />
          }
        />
        <Route
          path="/DashboardPage"
          element={
            <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
          }
        />
      </Routes>
    </Suspense>
  );
}
