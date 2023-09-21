import React from 'react';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    jokemessage: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    jokemessage?: React.CSSProperties;
  }

  interface Palette {
    green: Palette['primary'];
    blue: Palette['primary'];
  }

  interface TypeText {
    warning: string;
    blue: string;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    green?: PaletteOptions['primary'];
    blue?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    jokemessage: true;
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    green: true;
  }
}

const LightTheme = createTheme({
  breakpoints: {
    values: { xs: 320, sm: 600, md: 1024, lg: 1280, xl: 1440 },
  },
  typography: {
    fontFamily: 'Raleway, Arial',
    jokemessage: {
      color: 'black',
      fontSize: 25,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#69c076',
    },
    secondary: {
      main: '#2471ae',
    },
    text: {
      primary: '#808080',
      secondary: '#000000',
      warning: '#ff0031',
      blue: '#2471ae',
    },
    background: {
      paper: '#000000',
      default: '#ffffff',
    },
    green: {
      main: '#69c076',
      contrastText: '#fff',
    },
    blue: {
      main: '#2471ae',
      contrastText: '#fff',
    },
  },
});

const DarkTheme = createTheme({
  breakpoints: {
    values: { xs: 320, sm: 600, md: 1024, lg: 1280, xl: 1440 },
  },
  palette: {
    mode: 'dark',
    background: {
      paper: '#000000',
      default: '#333333',
    },
  },
});

export { LightTheme, DarkTheme };
