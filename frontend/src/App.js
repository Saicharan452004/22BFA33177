import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import RedirectPage from './pages/RedirectPage';

class App extends React.Component {
  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
            <Button color="inherit" component={Link} to="/">Shorten</Button>
            <Button color="inherit" component={Link} to="/stats">Statistics</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<ShortenerPage />} />
            <Route path="/stats" element={<StatisticsPage />} />
            <Route path="/:shortCode" element={<RedirectPage />} />
          </Routes>
        </Container>
      </>
    );
  }
}

export default App;