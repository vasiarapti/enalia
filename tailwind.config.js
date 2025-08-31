/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      colors: {
        primary: '#7a9d8a',
        hover: '#617d6e',
        secondary: '#F7EADF',
        inpage: '#fbfaf8',
        footer: '#7a9d8a',
      },
    },
    backgroundImage: {
      'waves': "url('../assets/layered-waves-haikei.svg')",
      'background': "url('../assets/wave-haikei.svg')",
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
