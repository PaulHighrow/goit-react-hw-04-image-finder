import PropTypes from 'prop-types';
import { ErrorNote, ErrorImage } from './ErrorMessage.styled';

export const ErrorMessage = ({ error }) => {
  return (
    <>
      <ErrorNote>
        Whoops, something went wrong: "{error.message}". Please try again!
      </ErrorNote>
      {error.code && (
        <ErrorImage
          src="https://pbs.twimg.com/media/FjOBR_vX0AAw8A6?format=jpg&name=medium"
          alt="Error 404"
        />
      )}
    </>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};
