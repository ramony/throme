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

const Paths = {
    entry : 'configData/entry.json',
    rules: ["configData/ruleConfig"],
    download: 'configData/download.json'
}

export { NoTextTransform, SmallText, theme, Paths }