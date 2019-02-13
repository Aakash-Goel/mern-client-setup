import React, { Fragment } from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { SheetsRegistry } from 'jss';
import flush from 'styled-jsx/server';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createGenerateClassName,
  createMuiTheme,
} from '@material-ui/core/styles';
import muiTheme from '../styles/theme/muiTheme';

// import styles from '../styles'; // eslint-disable-line no-unused-vars
import catchErrors from '../utils/errorBoundary';
// import preloadAssets from '../utils/preloadAssets';

// import cssIncludes from '../styles/cssIncludes';
// import { PHONE, MOBILE, DESKTOP, WEB_FONT_PATHS } from '../constants';

const theme = createMuiTheme({ ...muiTheme });

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheetsRegistry = new SheetsRegistry();
    // Create a new class name generator.
    const generateClassName = createGenerateClassName();
    // Create a sheetsManager instance.
    const sheetsManager = new Map();
    const page = renderPage(App => props => (
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App {...props} />
        </MuiThemeProvider>
      </JssProvider>
    ));
    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString();

    return {
      ...page,
      styles: (
        <Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
          {flush() || null}
        </Fragment>
      ),
    };
  }

  render() {
    const Content = catchErrors(Main);
    // const { styleTags } = this.props;
    // const preLoadFonts = WEB_FONT_PATHS || [];

    return (
      <html lang="en">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        </Head>
        <body className="app">
          <Content />
          <NextScript />
        </body>
      </html>
    );
  }
}
