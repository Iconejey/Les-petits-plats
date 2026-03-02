'use client';
import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isError, setIsError] = useState(false);

  return (
    <UIContext.Provider value={{ isError, setIsError }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
