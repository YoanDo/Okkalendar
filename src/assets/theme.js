const theme = {
  colors: {
    error: '#FF9000',
    grey: '#7A7877',
    highlight: '#4460F2',
    main: '#222031',
    highlightBackground: '#F0F2FE',
    success: '#00FFE4',
    white: '#FFFFFF',
  },
  fontSizes: {
    title: '24px',
    default: '16px',
    small: '14px',
  },
  transitions: {
    quick: '0.1s ease',
    default: '0.3s ease-in-out',
    elastic: 'transform 0.2s cubic-bezier(0.2, 0.7, 0.4, 1.2)',
  },
  borderRadius: {
    input: '16px',
    button: '12px',
    small: '10px',
  },
  spacing: (x) => `calc(${x}*16px)`,
  colorWithOpacity: (hex, opacity) => {
    const color = hex.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const result = `rgba(${r},${g},${b},${opacity / 100})`;

    return result;
  },
};

export default theme;
