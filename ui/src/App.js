import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

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
  const [responseContent, setResponseContent] = useState([]);
  const [userPromt, setUserPrompt] = useState('');
  const [isMetaPressed, setIsMetaPressed] = useState(false);
  const [socketConnection, setSocketConnection] = useState();

  const sendButtonOnClick = async () => {
    if (userPromt.trim().length > 0) {
      setUserPrompt('');
      setResponseContent([
        ...responseContent,
        { content: userPromt, id: new Date().valueOf() },
      ]);
      await socketConnection.emit('user-entered-prompt', { userPromt });
    }
  }

  const onPromptEnter = ({ target: { value: enteredPrompt } }) => {
    setUserPrompt(enteredPrompt)
  }

  useEffect(() => {
    if (!socketConnection) {
      const socket = socketIOClient('http://127.0.0.1:4000');
      socket.on('user-entered-prompt-accepted', data => {
        console.log('--user-entered-prompt-accepted', data);
      }).on('user-entered-prompt-failed', data => {
        console.log('--user-entered-prompt-failed', data);
      });
      setSocketConnection(socket);
    }
  }, [socketConnection]);

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
          {responseContent.map(({ content, id }, index) => {
            return (
              <Paper
                key={id ?? index}
                style={{
                  backgroundColor: theme.palette.secondary.light,
                }}
                component="form"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  paddingBottom: 3,
                  paddingTop: '10px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  marginTop: 1,
                }}
              >
                <Typography>{content}</Typography>
              </Paper>
            )
          })}
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
              onChange={onPromptEnter}
              value={userPromt}
              onKeyPress={(ev) => {
                if (ev.key === 'Meta') {
                  setIsMetaPressed(true);
                } else if (ev.key === 'Enter' && isMetaPressed) {
                  sendButtonOnClick()
                } else {
                  setIsMetaPressed(false);
                }
              }}
              onKeyDown={(ev) => {
                if (ev.key === 'Meta') {
                  setIsMetaPressed(true);
                } else if (ev.key === 'Enter' && isMetaPressed) {
                  sendButtonOnClick()
                } else {
                  setIsMetaPressed(false);
                }
              }}
            />
            <IconButton
              size={'large'}
              color="primary"
              sx={{ p: '10px' }}
              aria-label="directions"
              onClick={sendButtonOnClick}
            >
              <Send />
            </IconButton>
          </Paper>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
