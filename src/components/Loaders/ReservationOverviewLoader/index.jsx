import React from 'react';

const ReservationOverviewLoader = () => {
  return (
    <div>
      <div className="h-6 w-64 bg-gray-300 mb-4"></div>
      <div className="h-4 w-80 bg-gray-300 mb-3"></div>

      <div className="flex flex-col justify-between gap-3 my-5 sm:flex-row sm:items-end">
        <div className="flex gap-1 sm:items-center">
          <div className="flex flex-col">
            <div className="h-6 w-32 bg-gray-300 mb-2"></div>
          </div>

          <div className="flex flex-col">
            <div className="h-6 w-32 bg-gray-300 mb-2"></div>
          </div>
        </div>
        <div>
          <span className="h-4 w-8 bg-gray-300 inline-block"></span>{' '}
          <span className="h-4 w-12 bg-gray-300 inline-block"></span>{' '}
        </div>
      </div>

      <div className="flex flex-col">
        <div className=" w-full">
          <div className="inline-block min-w-full">
            <div className="animate-pulse shadow border-b border-gray-200 sm:rounded-lg">
              <div className="bg-gray-200 h-10 flex divide-gray-300">
                <div className="table-heading h-full"></div>
                <div className="table-heading h-full"></div>
                <div className="table-heading h-full"></div>
                <div className="table-heading h-full "></div>
                <div className="table-heading h-full "></div>
                <div className="table-heading h-full "></div>
                <div className="table-heading h-full "></div>
              </div>

              <div className="bg-white divide-y divide-gray-200">
                <div className="h-10 flex divide-gray-300">
                  <div className="table-content "></div>
                  <div className="table-content "></div>
                  <div className="table-content "></div>
                  <div className="table-content "></div>
                  <div className="table-content "></div>
                  <div className="table-content "></div>
                  <div className="table-content "></div>
                </div>
                <div className="h-10 flex divide-gray-300">
                  <div className="table-content"></div>
                  <div className="table-content"></div>
                  <div className="table-content"></div>
                  <div className="table-content"></div>

                  <div className="table-content"></div>
                  <div className="table-content"></div>
                  <div className="table-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationOverviewLoader;
