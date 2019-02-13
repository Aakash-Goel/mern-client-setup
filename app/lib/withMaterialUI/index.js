import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import muiTheme from '../../styles/theme/muiTheme';
import './tapEvents';

const theme = createMuiTheme({ ...muiTheme });

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
