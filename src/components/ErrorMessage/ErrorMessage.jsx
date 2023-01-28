import PropTypes from 'prop-types';
import { ErrorNote } from './ErrorMessage.styled';

export const ErrorMessage = ({ error }) => {
  return (
    <ErrorNote>Whoops, something went wrong: "{error.message}". Please try again!</ErrorNote>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};
