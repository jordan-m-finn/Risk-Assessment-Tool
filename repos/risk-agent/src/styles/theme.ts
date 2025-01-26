export const theme = {
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
    background: {
      light: '#f5f7fa',
      dark: '#1a2433',
      card: {
        light: '#ffffff',
        dark: '#243447'
      },
      input: {
        dark: '#1e293b'
      }
    },
    border: {
      light: '#e5e7eb',
      dark: '#374151'
    }
  }
}

export type Theme = typeof theme