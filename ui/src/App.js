import React from 'react';

import { AppBar, Box, TextField, IconButton, Paper, Stack, Typography, Toolbar } from '@mui/material';
import {Send} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffe0b2',
      main: '#f4511e',
      dark: '#f57c00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#cfd8dc',
      main: '#607d8b',
      dark: '#263238',
      contrastText: '#fff',
    },
  },
});

function App() {
  console.log(theme)

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ marginTop: 1 }}>
        <Toolbar>
          <Typography variant="h4" style={{ fontSize: 20 }}>
            GenSageAI
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="App">
        <Stack direction={'column'}>

        </Stack>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '98%',
            marginBottom: 10,
          }}
        >
          <Paper
            style={{
              backgroundColor: theme.palette.secondary.light,
            }}
            component="form"
            sx={{ display: 'flex', alignItems: 'center', flex: 1, paddingBottom: 3, paddingTop: '10px', paddingLeft: '10px',  paddingRight: '10px' }}
          >
            <TextField
              id="outlined-textarea"
              label="Multiline Prompt"
              placeholder="What is the stil manufacturing tonnage in Finland in 2025"
              multiline
            />
            <IconButton size={'large'} color="primary" sx={{ p: '10px' }} aria-label="directions">
              <Send />
            </IconButton>
          </Paper>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
