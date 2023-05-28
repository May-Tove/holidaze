import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

/**
 * A component that sets the page title and meta description for SEO purposes.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The description of the page.
 * @returns {JSX.Element} A Helmet element containing the page title and meta description.
 */
const SEOHelmet = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

SEOHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SEOHelmet;
