import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { store } from 'store';
import { LightTheme } from 'theme';

import HomeRoute from './Home';

const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<HomeRoute />} />
  </Routes>
);

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  </Provider>
);

export default App;
