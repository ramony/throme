import { createTheme } from '@mui/material/styles';

const NoTextTransform = { textTransform: "none"};
const SmallText = { width: "80px" };

const theme = createTheme({
    palette: {
        primary: {
            light: '#C0C0C0',
            main: '#B0B0B0',
            dark: '#A0A0A0'
        },
    },
});

const DataFolder = "configData";

const Paths = {
  entry : `${DataFolder}/entry.json`,
  rules: [`${DataFolder}/ruleConfig.json`],
  download: `${DataFolder}/download.json`
}

export { NoTextTransform, SmallText, theme, Paths }