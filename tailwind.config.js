module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'media', // or 'media' or 'class'
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};
