import { Component } from 'react';
import logger from './logger';

export default function(WrappedComponent) {
  return class errorBoundaryComponent extends Component {
    componentDidCatch(error, info) {
      logger.error(JSON.stringify(`App failed to load with errors: ${error}`));
      logger.info(JSON.stringify(info));
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
