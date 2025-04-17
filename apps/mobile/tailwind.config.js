/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textShadow: {
        default: '0 2px 4px rgba(0,0,0,0.1)',
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        lg: '0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        white: '0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.5)',
        neon: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6',
        none: 'none',
      },

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
  plugins: [
    function ({ addUtilities, theme, variants, matchUtilities }) {
      // Add predefined text shadow utilities
      const textShadows = theme('textShadow', {})

      const textShadowUtilities = Object.entries(textShadows).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`.text-shadow${key === 'default' ? '' : `-${key}`}`]: {
            textShadow: value,
          },
        }),
        {},
      )

      addUtilities(textShadowUtilities, variants('textShadow', ['responsive']))

      // Add arbitrary value support using matchUtilities (Tailwind v3.0+)
      if (matchUtilities) {
        matchUtilities(
          {
            'text-shadow': (value) => ({
              textShadow: value,
            }),
          },
          { values: textShadows },
        )
      }
    },
  ],
  variants: {
    extend: {
      textShadow: ['responsive', 'hover', 'focus'],
    },
  },
  // Enable JIT mode for arbitrary values
  mode: 'jit',
  // Ensure arbitrary values are allowed
  safelist: [{ pattern: /text-shadow-\[.*\]/ }],
}
