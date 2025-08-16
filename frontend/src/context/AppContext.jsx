import React, { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  };

  const removeAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const value = {
    doctors,
    appointments,
    user,
    setUser,
    addAppointment,
    removeAppointment
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
