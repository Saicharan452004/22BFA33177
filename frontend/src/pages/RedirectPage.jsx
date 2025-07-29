import React from 'react';
import { useParams } from 'react-router-dom';
import { getUrls, saveUrls } from '../utils/storage';
import { log } from '../utils/logger';

// This is a wrapper to inject URL params into our class component
export function withRouter(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class RedirectPage extends React.Component {
  componentDidMount() {
    const { shortCode } = this.props.params;
    const urls = getUrls();
    const urlIndex = urls.findIndex(url => url.shortCode === shortCode);

    if (urlIndex > -1) {
      log('info', 'page', `Redirecting shortcode: ${shortCode}`);
      // Update click stats
      urls[urlIndex].clicks++;
      urls[urlIndex].clickDetails.push({
          timestamp: new Date().toISOString(),
          source: document.referrer || 'Direct',
          location: 'N/A (Client-Side)',
      });

      // Save updated data and redirect
      saveUrls(urls);
      window.location.href = urls[urlIndex].originalUrl;
    } else {
      log('error', 'page', `Shortcode not found: ${shortCode}`);
    }
  }

  render() {
    const { shortCode } = this.props.params;
    return <p>Searching for {shortCode}... If you are not redirected, the link may be invalid.</p>;
  }
}

export default withRouter(RedirectPage);