import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import NotificationProvider from './context/NotificationProvider';
import TabProvider from './context/TabProvider';
import RefreshDataProvider from './context/RefreshDataProvider';
import LoaderProvider from './context/LoaderProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RefreshDataProvider>
        <LoaderProvider>
          <NotificationProvider>
            <AuthProvider>
              <TabProvider>
                <App />
              </TabProvider>
            </AuthProvider>
          </NotificationProvider>
        </LoaderProvider>
      </RefreshDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
