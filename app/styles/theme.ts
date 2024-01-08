import { createTheme } from "@mui/material";
import { blue, red, yellow, purple, lightGreen } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      pending: string;
      viewed: string;
      completed: string;
      aborted: string;
      'in progress': string
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      pending?: string;
      viewed?: string;
      completed?: string;
      aborted?: string;
      'in progress'?: string
    };
  }
}

const theme = createTheme({
  status: {
    pending: blue[200],
    viewed: purple[100],
    completed: lightGreen[500],
    'in progress': yellow[100],
    aborted: red[200]
  }
});

export default theme