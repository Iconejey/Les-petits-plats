import { Geist, Geist_Mono, Anton, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UIProvider } from './UIContext';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

const anton = Anton({
	variable: '--font-anton',
	subsets: ['latin'],
	weight: '400'
});

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin']
});

export const metadata = {
	title: 'Les petits plats',
	description: 'Recettes de cuisine faciles et rapides pour tous les jours'
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${manrope.variable}`}>
				<UIProvider>
					<Header />
					{children}
					<Footer />
				</UIProvider>
			</body>
		</html>
	);
}
