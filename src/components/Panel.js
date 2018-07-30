import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import BackButton from './BackButton';

/**
 * A wrapper for pages. It displays provided 'title' and show a 'goBack' button if
 * history router prop is provided.
 * @param {Object} props {title: String, children: node, history: any}
 */
const Panel = ({ title, children, history }) => (
  <div className="container">
    {history && <BackButton history={history} />}
    <PageHeader>
      {title}
    </PageHeader>
    {children}
  </div>
);

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object,
};

Panel.defaultProps = {
  history: null,
};


export default Panel;
