import React from 'react';
import { Typography, TextField, Button, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getUrls, saveUrls } from '../utils/storage';

import { log } from '../utils/logger';

class ShortenerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalUrl: '',
      customShortcode: '',
      validity: 30,
      results: [], // To display recent results
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    log('info', 'component', 'Shorten URL form submitted.');

    // 1. Validate URL
    try {
      new URL(this.state.originalUrl);
    } catch (_) {
      log('error', 'component', `Invalid URL provided: ${this.state.originalUrl}`);
      alert('Error: Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    const urls = getUrls();
    let shortCode = this.state.customShortcode.trim();

    // 2. Handle Shortcode
    if (shortCode) {
      if (urls.some(url => url.shortCode === shortCode)) {
        log('error', 'component', `Custom shortcode already exists: ${shortCode}`);
        alert('Error: This custom shortcode is already taken.');
        return;
      }
    } else {
      // Generate a unique random shortcode
      do {
        shortCode = Math.random().toString(36).substring(2, 8);
      } while (urls.some(url => url.shortCode === shortCode));
    }

    // 3. Create URL Object
    const now = new Date();
    const expiryDate = new Date(now.getTime() + this.state.validity * 60000);

    const newUrl = {
      id: shortCode,
      shortCode: shortCode,
      originalUrl: this.state.originalUrl,
      createdAt: now.toISOString(),
      expiresAt: expiryDate.toISOString(),
      clicks: 0,
      clickDetails: [],
    };
    
    // 4. Save and update state
    saveUrls([...urls, newUrl]);
    log('info', 'component', `URL shortened successfully. Shortcode: ${shortCode}`);
    this.setState(prevState => ({
        results: [newUrl, ...prevState.results],
        originalUrl: '', // Clear form
        customShortcode: '',
    }));
  };

  render() {
    return (
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a Short Link
        </Typography>
        <Box component="form" onSubmit={this.handleSubmit} noValidate>
          <TextField label="Original URL" name="originalUrl" value={this.state.originalUrl} onChange={this.handleInputChange} variant="outlined" fullWidth required margin="normal" placeholder="https://example.com" />
          <TextField label="Custom Shortcode (Optional)" name="customShortcode" value={this.state.customShortcode} onChange={this.handleInputChange} variant="outlined" fullWidth margin="normal" />
          <TextField label="Validity in Minutes (Optional)" name="validity" type="number" value={this.state.validity} onChange={this.handleInputChange} variant="outlined" fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>Shorten URL</Button>
        </Box>

        {this.state.results.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Recent Links</Typography>
            <List>
              {this.state.results.map((result) => (
                <React.Fragment key={result.id}>
                  <ListItem>
                    <ListItemText 
                      primary={`/${result.shortCode}`} 
                      secondary={result.originalUrl} 
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    );
  }
}

export default ShortenerPage;