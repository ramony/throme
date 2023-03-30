import { createTheme } from '@mui/material/styles';

const NoTextTransform = { textTransform: "none"};
// const ButtonGray = { textTransform: "none", bgcolor: "gray" };
const SmallText = { width: "80px" };

const GrayButtonTheme = createTheme({
    palette: {
        primary: {
            light: '#909090',
            main: '#909090',
            dark: '#808080'
        },
    },
});

export { NoTextTransform, SmallText, GrayButtonTheme }