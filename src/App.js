import './App.css';

import Container from './Container';

import { ThromeTheme } from './InputStyles';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={ThromeTheme}>
        <Container />
      </ThemeProvider>

    </div>
  );
}

export default App;
