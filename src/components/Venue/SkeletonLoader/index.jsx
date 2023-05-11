import React from 'react';

const SkeletonLoader = () => {
  return (
    <div>
      <div className="animate-pulse">
        <div className="h-72 lg:h-[600px] bg-gray-200 mb-5" />
        <div className="my-5 flex flex-col lg:flex-row justify-between items-start">
          <div className="flex flex-col gap-2 mb-5">
            <div className="h-8 w-64 bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-5 w-20 bg-gray-200" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded-full" />
              <div className="h-5 w-32 bg-gray-200" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 lg:w-14 lg:h-14 bg-gray-200 rounded-full" />
            <div>
              <div className="h-6 w-24 bg-gray-200" />
              <div className="h-4 w-24 bg-gray-200" />
            </div>
          </div>
        </div>
        <section className="flex flex-col lg:flex-row items-start gap-20">
          <div className="w-full lg:w-3/4">
            <div>
              <div className="h-6 w-32 bg-gray-200 my-3" />
              <div className="h-4 bg-gray-200 mb-3" />
              <div className="h-4 bg-gray-200 mb-3" />
              <div className="h-4 bg-gray-200" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-6 w-32 bg-gray-200 my-3" />
              <div className="flex gap-2 items-center text-sm">
                <div className="h-5 w-5 bg-gray-200" />
                <div className="h-4 w-16 bg-gray-200" />
              </div>
              <div className="flex gap-2 items-center text-sm">
                <div className="h-5 w-5 bg-gray-200" />
                <div className="h-4 w-16 bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[320px]">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 mb-3" />
              <div className="flex flex-col gap-3 mt-3">
                <div className="calendarWrap">
                  <div className="h-10 bg-gray-200 w-full" />
                </div>

                <div className="h-6 bg-gray-200 w-1/2 mb-2" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SkeletonLoader;
