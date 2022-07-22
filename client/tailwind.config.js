module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        fontSize: require('./src/lib/tailwind/fontSize'),
        spacing: require('./src/lib/tailwind/spacing'),
        extend: {
            lineHeight: require('./src/lib/tailwind/lineHeight'),
            maxWidth: require('./src/lib/tailwind/maxWidth'),
            borderWidth: require('./src/lib/tailwind/borderWidth'),
            backgroundImage: require('./src/lib/tailwind/backgroundImage'),
            colors: require('./src/lib/tailwind/colors'),
            keyframes: require('./src/lib/tailwind/keyframes'),
            animation: require('./src/lib/tailwind/animation'),
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
