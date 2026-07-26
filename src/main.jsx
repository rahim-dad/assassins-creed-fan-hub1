import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { store } from './store/store';
import App from './App';
import './index.css';

const sharedTokens = {
  colorPrimary: '#b8202f',
  colorLink: '#c6a15b',
  colorLinkHover: '#e0bd7d',
  fontFamily: "'Inter', -apple-system, sans-serif",
  borderRadius: 4,
  wireframe: false,
};

const darkTheme = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    ...sharedTokens,
    colorBgBase: '#08080a',
    colorBgContainer: '#131316',
    colorBgElevated: '#1c1c21',
    colorBgLayout: '#08080a',
    colorBorder: 'rgba(255,255,255,0.09)',
    colorText: '#ece9e2',
    colorTextSecondary: '#92929b',
  },
  components: {
    Menu: { itemBg: 'transparent', darkItemBg: 'transparent' },
    Layout: { bodyBg: '#08080a', headerBg: '#0a0a0c' },
    Card: { colorBgContainer: '#131316' },
  },
};

const lightTheme = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    ...sharedTokens,
    colorBgBase: '#f7f5f2',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f7f5f2',
    colorBorder: 'rgba(20,16,10,0.10)',
    colorText: '#1a1917',
    colorTextSecondary: '#655f56',
  },
  components: {
    Menu: { itemBg: 'transparent', darkItemBg: 'transparent' },
    Layout: { bodyBg: '#f7f5f2', headerBg: '#ffffff' },
    Card: { colorBgContainer: '#ffffff' },
  },
};

function ThemedApp() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ConfigProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </React.StrictMode>
);
