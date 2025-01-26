module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#003087',
          hover: '#002266',
          light: '#1a4fab',
        },
        secondary: {
          main: '#2c5282',
          hover: '#1a365d',
        },
        customBg: {
          light: '#f5f7fa',
          dark: '#1a2433',
          card: {
            light: '#ffffff',
            dark: '#243447'
          },
          input: {
            dark: '#1e293b'
          }
        }
      }
    }
  },
  // ... rest of your config
}