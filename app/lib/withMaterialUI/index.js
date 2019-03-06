/**
 * withMaterialUI/index.js
 *
 * This is an HOC wrapper to use/overide MaterialUI default theme
 *
 * Import this and wrap your component inside it.
 * Your component then able to access your custom MaterialUI theme
 *
 */

/**
 * Module dependencies.
 */
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import muiTheme from '../../styles/theme/muiTheme';
import './tapEvents';

/**
 * Module variables.
 * @private
 */
const theme = createMuiTheme({ ...muiTheme });

/**
 * initializePage
 * @public
 *
 * @param {Object} UIComponent - React Component
 *
 * @returns {Object} New React Component wrapped with MuiThemeProvider
 */
export default function initializePage(UIComponent) {
  return class PageComponent extends Component {
    static async getInitialProps(ctx) {
      const { req } = ctx;
      const isServer = !!req;
      let pageProps = {};

      if (UIComponent.getInitialProps) {
        pageProps = await UIComponent.getInitialProps(ctx);
      }

      return {
        ...pageProps,
        isServer,
      };
    }

    render() {
      return (
        <MuiThemeProvider theme={theme}>
          <UIComponent {...this.props} />
        </MuiThemeProvider>
      );
    }
  };
}
