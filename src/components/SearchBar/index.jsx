import React, { useState } from 'react';
import { CgSearch } from 'react-icons/cg';

const SearchBar = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [guests, setGuests] = useState(1);

  const handleGuestsChange = (event) => {
    const selectedGuests = event.target.value;
    setGuests(selectedGuests);
  };

  const guestOptions = [];
  for (let i = 1; i <= 15; i++) {
    guestOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="p-5 bg-white rounded w-4/5 m-auto">
      <form
        action=""
        className="flex flex-col lg:flex-row gap-5 justify-between items-end"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="">Where to?</label>
          <input
            className="border p-2"
            type="text"
            placeholder="Search for location"
            required
          />
        </div>
        <div className="flex w-full gap-5">
          <div className="flex flex-col w-full">
            <label htmlFor="">Check in</label>
            <input className="border p-2" type="date" min={today} />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Check out</label>
            <input className="border p-2" type="date" />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="">Guests</label>
          <select
            className="border p-2"
            value={guests}
            onChange={handleGuestsChange}
          >
            {guestOptions}
          </select>
        </div>
        <button className="btn flex items-center gap-3 h-fit">
          <CgSearch /> Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
