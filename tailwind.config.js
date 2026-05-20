/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f7f7f9',
        ink: '#1f1f24',
        muted: '#6b6f76',
        accent: '#1d9bf0',
        success: '#16a34a',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31, 31, 36, 0.08)',
        card: '0 8px 20px rgba(31, 31, 36, 0.06)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
}
