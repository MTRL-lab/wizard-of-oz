import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#EEEEEE',
    },
  },
});

export default theme