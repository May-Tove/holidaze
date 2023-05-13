const RemoveVenue = async (id, token) => {
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/holidaze/venues/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      window.alert('Venue deleted');
    } else {
      throw new Error('Failed to delete venue');
    }
  } catch (error) {
    console.error(error);
  }
};

export default RemoveVenue;
