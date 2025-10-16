export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      metamask: {
        orange: '#F6851B',
        'orange-light': '#F5B567',
        navy: '#1E2329',
        teal: '#00BFA5',
      },
    },
    fontFamily: {
      'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
      'display': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
    },
  },
};
export const plugins = [];
export const darkMode = 'media';
