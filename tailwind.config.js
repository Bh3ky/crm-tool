/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable manual toggle
    theme: {
        extend: {
            colors: {
                // Backgrounds - adapting to standard tailwind usage
                background: 'rgb(var(--bg-main) / <alpha-value>)', // Mapping 'bg-background' to '--bg-main'
                main: 'rgb(var(--bg-main) / <alpha-value>)',
                surface: 'rgb(var(--bg-surface) / <alpha-value>)',
                'surface-hover': 'rgb(var(--bg-surface-hover) / <alpha-value>)',

                // Text
                primary: 'rgb(var(--text-primary) / <alpha-value>)',
                secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
                muted: 'rgb(var(--text-muted) / <alpha-value>)',

                // Brand
                brand: {
                    DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
                    hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
                    light: 'rgb(var(--color-primary-light) / <alpha-value>)',
                },

                // Borders
                border: 'rgb(var(--border-color) / <alpha-value>)',

                // Status
                status: {
                    success: 'rgb(var(--status-success) / <alpha-value>)',
                    warning: 'rgb(var(--status-warning) / <alpha-value>)',
                    error: 'rgb(var(--status-error) / <alpha-value>)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
