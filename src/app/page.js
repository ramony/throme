"use client"

import '@/style/index.css';

import '@/style/App.css';

import React, { useState } from "react"

import Container from '@/component/Container';

import { theme } from '@/config/ThromeConfig';
import { ThemeProvider } from '@mui/material/styles';

import { AppStore } from '@/global/appStore'
import AppContext from '@/global/appContext'

export default function Home() {
  const [appStore] = useState(new AppStore());

  return (
    <React.StrictMode>
      <AppContext.Provider value={appStore}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Container />
          </div>
        </ThemeProvider>
      </AppContext.Provider>
    </React.StrictMode>
  );

}
