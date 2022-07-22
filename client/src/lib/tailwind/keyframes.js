module.exports = {
  spinner: {
    to: {
      transform: 'rotate(360deg)',
    },
  },
  zoomIn: {
    from: {
      opacity: 0,
      transform: 'scale(0.85)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  'like-button': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '25%': {
      transform: 'scale(1.2)',
    },
    '50%': {
      transform: 'scale(0.95)',
    },
  },
  'like-feed': {
    '0%': {
      transform: 'scale(0)',
    },
    '15%': {
      transform: 'scale(1.2)',
    },
    '30%, 70%': {
      transform: 'scale(1)',
    },
    '95%, 100%': {
      transform: 'scale(0)',
    },
  },
  skeleton: {
    from: {
      'background-position-x': '-100%',
    },
    to: {
      'background-position-x': '100%',
    },
  },
  'toast-in': {
    '0%': {
      transform: 'translateX(100%)',
      // opacity: 0,
    },
    '50%': {
      transform: 'translateX(-20px)',
    },
    '85%': {
      transform: 'translateX(15px)',
    },
    '100%': {
      transform: 'translateX(0)',
      // opacity: 1,
    },
  },
  'toast-out': {
    '0%': {
      transform: 'translateX(50px)',
      // opacity: 0,
    },
    '70%': {
      transform: 'translateX(-50px)',
      // opacity: 0,
    },
    '100%': {
      transform: 'translateX(100%)',
      // opacity: 1,
    },
  },
};
