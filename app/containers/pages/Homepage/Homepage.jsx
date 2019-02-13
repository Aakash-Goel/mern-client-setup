import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';

import Head from '../../../components/Head';
import withMaterial from '../../../lib/withMaterialUI';

import { selectCount } from './HomepageSelectors';

// asdasa
const propTypes = {
  testData: PropTypes.any,
};

const defaultProps = {
  testData: {},
};

const Homepage = () => {
  return (
    <Fragment>
      <Head title="My website" description="My website description goes here" />

      <div>Below Integration is complete</div>
      <Button variant="contained" color="primary">
        Default
      </Button>
      <ul>
        <li>Redux</li>
        <li>Saga</li>
        <li>Express</li>
        <li>React PropTypes</li>
        <li>Selectors using Reselect</li>
        <li>Babel</li>
        <li>Eslint</li>
        <li>Prettier</li>
        <li>Editorconfig</li>
        <li>Material UI</li>
      </ul>
    </Fragment>
  );
};

Homepage.propTypes = propTypes;
Homepage.defaultProps = defaultProps;

export const mapStateToProps = createStructuredSelector({
  testData: selectCount(),
});

export default connect()(withMaterial(Homepage));
