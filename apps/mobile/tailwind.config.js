/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2ef2aa',
          contrast: '#000000',
          shade: '#28d596',
          tint: '#43f3b3',
        },
        secondary: {
          DEFAULT: '#36b083',
          contrast: '#000000',
          shade: '#309b73',
          tint: '#4ab88f',
        },
        tertiary: {
          DEFAULT: '#125d42',
          contrast: '#ffffff',
          shade: '#10523a',
          tint: '#2a6d55',
        },
        success: {
          DEFAULT: '#36b083',
          contrast: '#000000',
          shade: '#309b73',
          tint: '#4ab88f',
        },
        warning: {
          DEFAULT: '#fedf16',
          contrast: '#000000',
          shade: '#e0c413',
          tint: '#fee22d',
        },
        danger: {
          DEFAULT: '#ff2436',
          contrast: '#000000',
          shade: '#e02030',
          tint: '#ff3a4a',
        },
        light: {
          DEFAULT: '#fafffc',
          contrast: '#000000',
          shade: '#dce0de',
          tint: '#fbfffc',
        },
        medium: {
          DEFAULT: '#dbdbdb',
          contrast: '#000000',
          shade: '#c1c1c1',
          tint: '#dfdfdf',
        },
        dark: {
          DEFAULT: '#0e0e0e',
          contrast: '#ffffff',
          shade: '#0c0c0c',
          tint: '#262626',
        },
      },
    },
  },
  plugins: [],
}
