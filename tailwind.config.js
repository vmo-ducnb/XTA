const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      sm: '0.75rem', //12px
      lg: '0.875rem', //14px
      base: '1rem', //16px
      '1xl': '1.125rem', //18px
      xl: '1.25rem', //20px
      '2xl': '1.5rem', //24px
      '3xl': '2rem', //32px
      '4xl': '3rem', // 48px
      '5xl': '6rem', //96px
    },
    container: {
      center: true,
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1216px',
        '2xl': '1216px',
        '3xl': '1216px',
      },
    },
    fontFamily: {
      sans: ['var(--font-custom)', ...fontFamily.sans],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gold: '#D1A95D',
        'rose-gold': {
          1: '#DA8784',
          2: '#7D7D7D',
          3: '#2B2B2B',
          primary: '#1F1F1F',
        },
        gold: {
          DEFAULT: '#D1A95D',
        },

        main: {
          100: '#FDE59D',
          200: '#E7C77B',
          primary: '#D1A95D',
          400: '#9D722B',
          500: '#A5702C',
          600: '#8F561A',
          700: '#793E0B',
        },
        bg: {
          primary: '#000000',
          disable: '#EAECEE',
        },
        text: {
          primary: '#FFFFFF',
          disable: '#B7B7B7',
        },
        success: '#5DC887',
        warning: '#F6931D',
        error: '#F6465D',
        divider: '#373A3D',
        dark: '#0D1A27',
      },
      height: {
        nav: '5.0625rem',
      },
      minHeight: {
        nav: '5.0625rem',
      },
      padding: {
        nav: '5.0625rem',
      },
      borderRadius: {
        18: '18px',
      },
      fontFamily: {
        alice: "'Alice', serif",
        worksans: "'Work Sans', sans-serif",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
