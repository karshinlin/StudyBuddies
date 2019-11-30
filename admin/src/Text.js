import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Text(props) {
  return (
    <Typography component="p" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Text.propTypes = {
  children: PropTypes.node,
};
