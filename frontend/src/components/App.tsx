import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Logger } from 'simple-logging-system';
import { getGlobalInstance } from 'plume-ts-di';
import Router from './layout/Router';
import Header from './layout/Header';
import Navigation from './navigation/Navigation';
import ConditionalRoute from './theme/routes/ConditionalRoute';
import Login from './features/login/Login';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';
import SessionService from '../services/session/SessionService';
import HallOfFamePage from './features/hall-of-fame/HallOfFamePage';

const logger = new Logger('App');
// To make the application have a base path that starts with /admin:
// - Replace the line bellow by: const basePath = '/admin';
// - Add the base attribute in the vite.config.ts file
const basePath = '/';

// react router redirection is not made anymore :(, see https://github.com/remix-run/react-router/issues/8427
if (window && !window.location.pathname.startsWith(basePath)) {
  window.history.replaceState('', '', basePath + window.location.pathname);
}

export default function App() {

  logger.info('Render App');
  return (
    <GlobalErrorBoundary>
      <ToastContainer />
      <Header />
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="*" element={<HallOfFamePage />} />
        </Routes>
      </BrowserRouter>
    </GlobalErrorBoundary>
  );
}
