import {GeistSans} from 'geist/font/sans';
import {GeistMono} from 'geist/font/mono';

import "./globals.css";

export const metadata = {
    title: "Hopper",
    description: "Traceroute visualizer",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-slate-800 text-amber-50 select-none`}>{children}</body>
        </html>
    );
}
