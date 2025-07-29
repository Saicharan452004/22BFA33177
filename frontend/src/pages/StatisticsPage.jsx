import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getUrls } from '../utils/storage';
import { log } from '../utils/logger';

class StatisticsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    };
  }

  componentDidMount() {
    log('info', 'page', 'Statistics page viewed.');
    this.setState({ urls: getUrls() });
  }

  render() {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>Statistics</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Short Link</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Expires At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.urls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell>/{url.shortCode}</TableCell>
                  <TableCell sx={{ wordBreak: 'break-all' }}>{url.originalUrl}</TableCell>
                  <TableCell>{url.clicks}</TableCell>
                  <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}

export default StatisticsPage;