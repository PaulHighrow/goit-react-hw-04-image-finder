import PropTypes from 'prop-types';
import { ErrorNote, ErrorImage } from './ErrorMessage.styled';
import img from '../../img/2.jpg';

export const ErrorMessage = ({ error }) => {
  return (
    <>
      <ErrorNote>
        Whoops, something went wrong: "{error.message}". Please try again!
      </ErrorNote>
      {error.code && <ErrorImage src={img} alt="Error 404" />}
    </>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};
