/*import React from 'react';
import useApi from '../../hooks/useApi';
import API_URL from '../../shared/url';

const Filters = () => {
  const { venues } = useApi(API_URL);

  console.log(venues);
  return (
    <section className="mt-40 w-full lg:w-1/5 bg-gray-300">
      <div className="flex flex-col gap-4 p-5">
        <h1>Filter</h1>
        <div className="flex flex-col">
          <h2>Rating</h2>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="rating-one" id="rating-one" />
            <label htmlFor="rating-one">1 star</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="rating-two" id="rating-two" />
            <label htmlFor="rating-two">2 stars</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="rating-three" id="rating-three" />
            <label htmlFor="rating-three">3 stars</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="rating-four" id="rating-four" />
            <label htmlFor="rating-four">4 stars</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="rating-five" id="rating-five" />
            <label htmlFor="rating-five">5 stars</label>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Facilities</h2>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="breakfast" id="breakfast" />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="parking" id="parking" />
            <label htmlFor="parking">Parking</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="pets" id="pets" />
            <label htmlFor="pets">Pets</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="wifi" id="wifi" />
            <label htmlFor="wifi">WiFi</label>
          </div>
        </div>
        <div>
          <h2>Price range</h2>
          <span>0 - 1500</span>
        </div>
      </div>
    </section>
  );
};

export default Filters;*/
