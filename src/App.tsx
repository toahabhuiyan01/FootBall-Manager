import './App.css'

import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My React App
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Your React App
          </Typography>
          <Typography variant="body1" paragraph>
            This is a basic setup with Vite, React, TypeScript, and Material UI.
            Start building your awesome application!
          </Typography>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
