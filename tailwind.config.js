/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

const colors = require('tailwindcss/colors');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      width: '100%',
      padding: '0 10px',
    },
    screens: {
      sm: { min: '764px' },
      md: { min: '980px' },
    },
    extend: {
      fontFamily: {
        rokkitt: ['Rokkitt', 'serif'],
      },
      colors: {
        darkKnight: {
          100: '#E8E8EB',
          200: '#D2D1D6',
          300: '#A5A3AE',
          400: '#777585',
          500: '#59566C',
          600: '#1D1934',
          700: '#17142A',
          800: '#110F1F',
          900: '#0C0A15',
          1000: '#06050A',
        },
        trusted: {
          100: '#E8E8EB',
          200: '#E2CCF2',
          300: '#C599E5',
          400: '#A866D8',
          500: '#8B33CB',
          600: '#6E00BE',
          700: '#580098',
          800: '#420072',
          900: '#2C004C',
          1000: '#160026',
        },
        edge: {
          100: '#EAE6ED',
          200: '#D5CCDB',
          300: '#AB99B7',
          400: '#806694',
          500: '#65457C',
          600: '#2C004C',
          700: '#23003D',
          800: '#1A002E',
          900: '#12001E',
          1000: '#09000F',
        },
        grey: {
          100: '#F4F4F5',
          200: '#E7E7EA',
          300: '#D2D1D6',
          400: '#A5A3AE',
          500: '#565365',
          600: '#2B244C',
          700: '#1D1934',
          800: '#12101D',
          900: '#131120',
        },
        primary: {
          100: '#F7F2FA',
          200: '#6E00BE',
          300: '#FC5912',
          400: '#F1E6F9',
        },
        gumdropGreen: {
          500: '#2BA682',
          600: '#228568',
          700: '#D5EDE6',
        },
        starGrass: {
          100: '#F1FBF9',
        },
        'surface-primary-pressed': '#F1E6F9',
        warning: '#FFA000',
        error: '#E03923',
        fontColor: {
          'content-tertiary': '#777584',
        },
        disabled: '#F6F6F7',
        primary: '#101630',
        secondary: '#4EB6DB',
        tertiary: '#FFF',
        buttons: '#FF9C1A',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
      },
      animation: {
        'meteor-effect': 'meteor 5s linear infinite',
      },
      customCSS: {
        'transform-transition': 'transition-transform',
      },
      fontSize: {
        xxs: '10px',
        xs: '16px',
        s: '20px'
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    addVariablesForColors,
  ],
};


function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}