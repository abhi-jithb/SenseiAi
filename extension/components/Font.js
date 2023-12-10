import { createTheme } from '@mui/material/styles'
import { poppins } from '@fontsource/poppins';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
   
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [poppins],
      },
    },
  },
});

export default theme;