import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'asparagus': '#7CA24E',
        'hunter-green': '#3F6A38',
        'scary-forest': '#386131',
        'mint-cream': '#EBF0E8',
        'white-smoke': '#F5F6F5',
        'night': '#3B3B3B',
        'shadow': '#808080',
        'silver': '#BDBDBD',
        'ivory': '#FFFDF7',
      },
      textColor: {
        default: '#FFFDF7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        lato: ['Lato'],
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
