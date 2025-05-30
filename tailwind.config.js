/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#769d88',        // Sidebar background
        hover: '#617d6e',          // Hover color
        secondary: '#edeae8',      // Text color
        inpage: '#fbfaf8'
      },
    },
  },
  plugins: [],
};
