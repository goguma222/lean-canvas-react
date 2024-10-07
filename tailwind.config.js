/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        md: '0px 1px 5px 2px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', // 사용자 정의 그림자
      },
      width: {
        'calc-50p-42p': 'calc(50% - 42%)',
        'calc-50p-38p': 'calc(50% - 38%)',
        'calc-50p-30p': 'calc(50% - 30%)',
        'calc-50p-10p': 'calc(50% - 10%)',
        'calc-100p-60p': 'calc(100% - 60px)',
      },
    },
  },
  plugins: [],
};
