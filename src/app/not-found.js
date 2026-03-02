'use client';
import { useEffect } from 'react';
import { useUI } from './UIContext';

export default function NotFound() {
	const { setIsError } = useUI();

	useEffect(() => {
		setIsError(true);

		// Reset the error state when the component unmounts
		return () => setIsError(false);
	}, [setIsError]);

	return null;
}
