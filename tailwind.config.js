/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: '#605BFF',
      link: '#346BD4',
      textsecondary: '#858585',
      texticon: '#030229',
      textwarn: '#D33030',
      texttable: '#231F20',
      bgbody: '#FAFAFB',
      bginput: '#F5F5F5',
      bgfocus: '#EAEAEA',
      bgtable: '#F5F5F5',
      bgrow: '#FFFFFF',
      dropdown: '#999CA0',
    },
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      nunito: ['Nunito', 'sans-serif'],
      figtree: ['Figtree', 'sans-serif'],
    },
  },
  plugins: [],
}
