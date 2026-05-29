/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f1729',
        ink: '#ecf0f7',
        muted: '#cbd5e1',
        accent: '#00d9ff',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.5)',
        card: '0 8px 20px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
}
