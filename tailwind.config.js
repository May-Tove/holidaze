/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#104F55',
        secondary: '#32746D',
        white: '#fff',
        black: '#000',
      },
      fontFamily: {
        sans: [
          'kumbh-sans-variable, sans-serif',
          {
            fontVariationSettings: '"wght" 300',
          },
        ],
        serif: ['quiche-flare, sans-serif'],
      },
      fontWeight: {
        bold: '900',
      },
      gridTemplateColumns: {
        2: 'repeat(auto-fit, minmax(170px, 1fr))',
        4: 'repeat(auto-fit, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [],
};
