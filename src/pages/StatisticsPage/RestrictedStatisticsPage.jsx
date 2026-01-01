// src/components/Statistics/RestrictedStatisticsPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import StatisticsPage from "./StatisticsPage";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const RestrictedStatisticsPage = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return <StatisticsPage />;
};

export default RestrictedStatisticsPage;
