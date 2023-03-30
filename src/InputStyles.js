import { createTheme } from '@mui/material/styles';

const NoTextTransform = { textTransform: "none"};
const SmallText = { width: "80px" };

const ThromeTheme = createTheme({
    palette: {
        primary: {
            light: '#909090',
            main: '#909090',
            dark: '#808080'
        },
    },
});

export { NoTextTransform, SmallText, ThromeTheme }