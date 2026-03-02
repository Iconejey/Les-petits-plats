'use client';
import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
	const [isError, setIsError] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	return <UIContext.Provider value={{ isError, setIsError, searchQuery, setSearchQuery }}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
