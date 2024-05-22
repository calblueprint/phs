import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /** Color palette for the app, based on the design system in the figma file */
      colors: {
        asparagus: '#7CA24E',
        'hunter-green': '#3F6A38',
        'scary-forest': '#386131',
        'mint-cream': '#EBF0E8',
        'white-smoke': '#F5F6F5',
        night: '#3B3B3B',
        shadow: '#808080',
        silver: '#BDBDBD',
        ivory: '#FFFDF7',
      },
      textColor: {
        default: '#FFFDF7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        web: '1024px',
      },
      /** Default font is Lato */
      fontFamily: {
        sans: ['Lato'],
        lato: ['Lato'],
      },
      screens: {
        web: '1024px',
      },
      theme: {
        fontSize: {
          sm: ['14px', '20px'],
          base: ['16px', '19px'],
          lg: ['20px', '28px'],
          xl: ['24px', '32px'],
        },
      },
      boxShadow: {
        vignette: '0px 4px 24px 0px rgba(20, 20, 20, 0.2) inset',
        light: `0px 4px 24px 0px rgba(20, 20, 20, 0.16)`,
        dark: '0px 0px 14px 0px rgba(0, 0, 0, 0.25);',
        darkest: '0px 4px 24px 0px rgba(0, 0, 0, 0.40)',
        'strong-inner':
          'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2), inset 0 2px 10px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
