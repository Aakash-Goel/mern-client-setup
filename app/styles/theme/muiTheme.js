/**
 * muiTheme.js
 *
 * Here you can define the theme which then pass to MuiThemeProvider
 * inside `app/pages/_document.js` file
 *
 * Here you can import styles defined in muiKit.js and
 * override default MaterialUI theme.
 *
 */

import purple from '@material-ui/core/colors/purple';

/**
 * Module variables.
 * @public
 */
const muiTheme = {
  palette: {
    primary: purple,
  },
};

/**
 * Module exports.
 * @public
 */
export default muiTheme;
