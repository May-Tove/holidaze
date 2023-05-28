import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import { API_VENUE_URL } from '../../../shared';
import ErrorMessage from '../../ErrorMessage';
import { CgCheckO } from 'react-icons/cg';

/**
 * A component that displays a modal for removing a venue.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the venue to remove.
 * @param {Function} props.handleClose - A function to handle closing the modal.
 * @returns {JSX.Element} A remove venue component.
 */
const RemoveVenue = ({ id, handleClose }) => {
  const { fetchApi, success, isError, isLoading, errorMessage } = useApi();
  const navigate = useNavigate();

  const handleDeleteVenue = async () => {
    await fetchApi(`${API_VENUE_URL}/${id}`, 'delete');

    setTimeout(() => {
      navigate('/venues');
    }, 1000);
  };

  return (
    <div className="modal">
      <div className="modal-body flex flex-col">
        {success ? (
          <div className="flex flex-col items-center gap-5 p-5">
            <CgCheckO className="text-primary" size={40} />
            <p>Successfully deleted</p>
          </div>
        ) : (
          <>
            <h2 className="text-center">
              Are you sure you want to delete this venue?
            </h2>
            <p>Action can not be undone</p>
            <div className="flex gap-3 justify-center mt-5">
              <button
                className="btn-danger"
                onClick={handleDeleteVenue}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
              <button className="btn-secondary" onClick={handleClose}>
                Cancel
              </button>
            </div>
            {isError && <ErrorMessage message={errorMessage} />}
          </>
        )}
      </div>
    </div>
  );
};
RemoveVenue.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default RemoveVenue;
