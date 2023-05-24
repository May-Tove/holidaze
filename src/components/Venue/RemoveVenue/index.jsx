import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { API_VENUE_URL } from '../../../shared';
import ErrorMessage from '../../../shared/errorMessage';
import { CgCheckO } from 'react-icons/cg';
import useMethodApi from '../../../hooks/useMethodApi';

const RemoveVenue = ({ id, handleClose }) => {
  const { fetchWithMethod, success, isError, isLoading } = useMethodApi();
  const navigate = useNavigate();

  const handleDeleteVenue = async () => {
    await fetchWithMethod(`${API_VENUE_URL}/${id}`, 'delete');

    setTimeout(() => {
      navigate('/venues');
    }, 1000);
  };

  return (
    <div className="modal">
      <div className="modalBody flex flex-col">
        {success ? (
          <div className="flex flex-col items-center gap-5 p-5">
            <CgCheckO className="text-primary" size={40} />
            <p>Successfully deleted</p>
          </div>
        ) : (
          <>
            <h2 className="pt-10">
              Are you sure you want to delete this venue?
            </h2>
            <p>Action can not be undone</p>
            <div className="flex gap-3 py-3 justify-center">
              <button
                className="dangerBtn"
                onClick={handleDeleteVenue}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Yes, delete this venue'}
              </button>
              <button className="btnSecondary" onClick={handleClose}>
                Cancel
              </button>
            </div>
            {isError && (
              <ErrorMessage message="There was a problem deleting this venue" />
            )}
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
