/**
 * Head.jsx
 *
 * This is an HOC wrapper for all your meta tags
 *
 * Single place where you can control your application meta/title tags
 *
 */

/**
 * Module dependencies.
 */
import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

/**
 * Type checking - Define prop types
 * @private
 */
const propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

/**
 * Define default prop values
 * @private
 */
const defaultProps = {
  title: '',
  description: '',
  url: '',
  ogImage: '',
};

/**
 * Head
 * A React functional component
 * @public
 *
 * @param {Object} props
 *
 * @returns {Object} React Component
 */
const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta name="twitter:site" content={props.url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage} />
    <meta property="og:image" content={props.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

Head.propTypes = propTypes;
Head.defaultProps = defaultProps;

/**
 * Module exports.
 * @public
 */
export default Head;
