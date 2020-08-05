import React, { createContext, useState } from "react";

export const ReservContext = createContext();

export const ReservProvider = ({ children }) => {
    const [resInfo, setResInfo] = useState("");
    const [carInfo, setCarInfo] = useState("");
  
    return (
        <ReservContext.Provider
        value={{
            resInfo,
            carInfo,
            setResInfo,
            setCarInfo
        }}>
        {children}
    </ReservContext.Provider>
    );
  };
