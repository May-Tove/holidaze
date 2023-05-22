import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { API_VENUE_URL } from '../../../shared';
import ErrorMessage from '../../../shared/errorMessage';
import { CgCheckO } from 'react-icons/cg';

const RemoveVenue = ({ id, handleClose }) => {
  const { submit, success, isError, isLoading } = useAxiosFetch();
  const navigate = useNavigate();

  const handleDeleteVenue = async () => {
    await submit(`${API_VENUE_URL}/${id}`, 'delete');

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
                {isLoading ? 'Deleting...' : 'Delete'}
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
