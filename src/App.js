import './App.css';

import Container from './component/Container';

import { theme } from './config/ThromeConfig';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container />
      </ThemeProvider>

    </div>
  );
}

export default App;
