/**
 * _document.js
 *
 * _document is only rendered on the server side and not on the client side
 * Is used to change the initial server side rendered document markup
 *
 * For more info, check out
 * https://github.com/zeit/next.js#custom-document
 *
 */

/**
 * Module dependencies.
 */
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
import catchErrors from '../utils/errorBoundary';

/**
 * Module variables.
 * @private
 */
const theme = createMuiTheme({ ...muiTheme });

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheetsRegistry = new SheetsRegistry();
    // Create a new class name generator.
    const generateClassName = createGenerateClassName();
    // Create a sheetsManager instance.
    const sheetsManager = new Map();
    // Create App instance.
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
    // Grab CSS from our sheetsRegistry.
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
