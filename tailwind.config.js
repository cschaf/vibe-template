/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all relevant files in src
    "./public/index.html", // If you use classes in index.html
  ],
  theme: {
    extend: {
      colors: {
        // You can extend or override Tailwind's default color palette here
        // For example, to match the previous distinct colors:
        // 'header-orange': '#f8b400',
        // 'sidebar-green': '#4caf50',
        // 'content-blue': '#2196f3',
        // 'footer-bluegray': '#607d8b',
      },
      spacing: {
        // Example: define header height as a reusable value
        // 'header-height': '4rem', // 16 (h-16 in Tailwind)
      }
    },
  },
  plugins: [],
};
