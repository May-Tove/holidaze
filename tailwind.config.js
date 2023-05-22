/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9FC3C4',
        primaryLight: '#DEEDED',
        primaryDark: '#4C8185',
        secondary: '#9FC3C4',
        light: '#f0f0f0',
        lightGrey: '#838383',
        white: '#fff',
        black: '#000',
        focus: '#018F93',
      },
      fontFamily: {
        serif: ['quiche-flare, sans-serif'],
      },
      gridTemplateColumns: {
        3: 'repeat(auto-fill, minmax(300px, 1fr))',
        4: 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      boxShadow: {
        lg: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;',
      },
    },
  },
  plugins: [],
};

/*
       sans: [
          'kumbh-sans-variable, sans-serif',
          {
            fontVariationSettings: '"wght" 400',
          },
        ],*/
