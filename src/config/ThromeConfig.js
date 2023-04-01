import { createTheme } from '@mui/material/styles';

const NoTextTransform = { textTransform: "none"};
const SmallText = { width: "80px" };

const theme = createTheme({
    palette: {
        primary: {
            light: '#909090',
            main: '#909090',
            dark: '#808080'
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