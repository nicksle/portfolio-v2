import React, { createContext, useContext } from 'react';

export const DropdownContext = createContext();

export const useDropdownGroup = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdownGroup must be used within a DropdownGroup');
  }
  return context;
}; 