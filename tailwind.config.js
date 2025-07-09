/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'tramslateX(-100%)' },
        },
      },
      colors: {
        primary: '#769d88',        // Sidebar background - dark green
        hover: '#617d6e',          // Hover color -grey green
        secondary: '#edeae8',      // Text color - beige
        inpage: '#fbfaf8',        // Like-white
        // footer: '#7a9d8a'
        footer: '#efdfd2'
      },
    },
    backgroundImage: {
      'waves': "url('../assets/layered-waves-haikei.svg')",
      'background': "url('../assets/wave-haikei.svg')",
    },
  },
  plugins: [],
};
