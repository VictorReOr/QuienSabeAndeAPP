/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                caseta: {
                    verde: '#2D6A27',
                    blanco: '#FFFFFF',
                    rosa: '#E8628A',
                    albero: '#DFC48A',
                    dorado: '#FFD700'
                }
            },
            fontFamily: {
                feria: ['SVQJusta', 'serif'],
            }
        },
    },
    plugins: [],
}