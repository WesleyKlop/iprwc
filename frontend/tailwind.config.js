module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'media',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
