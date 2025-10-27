import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ASU Official Colors
        primary: '#8C1D40', // Maroon
        secondary: '#FFC627', // Gold

        // Maroon Shades
        'primary-dark': '#6b1630',
        'primary-light': '#A84B66',

        // Gold Shades
        'secondary-dark': '#E6A800',
        'secondary-light': '#FFD75F',

        // ASU Accent Colors
        'asu-green': '#78BE20',
        'asu-blue': '#00A3E0',
        'asu-orange': '#FF7F32',
        'asu-gray': '#747474',
      },
    },
  },
  plugins: [],
} satisfies Config;