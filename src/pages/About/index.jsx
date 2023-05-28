import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHelmet from '../../components/SEOHelmet';
import aboutImgBathroom from '../../assets/luxury_bathroom.jpg';
import aboutImgWindow from '../../assets/woman_in_window.jpg';
import aboutImgTub from '../../assets/pexels-monstera-6620858.jpg';
import aboutTraveller from '../../assets/traveler.jpg';
import aboutBreakfast from '../../assets/breakfast_table.jpg';
import venueMng2 from '../../assets/venue_manager_2.jpg';
import venueMng3 from '../../assets/venue_manager_3.jpg';

export const About = () => {
  return (
    <>
      <SEOHelmet
        title={'About | Holidaze'}
        description={
          'Holidaze is the ultimate platform for booking accommodations worldwide, as well as a way for property owners to access a global audience. We provide a broad selection of venues to suit any vacation, inspired by our aim to make travel extraordinary. Start exploring with Holidaze today!'
        }
      />
      <main>
        <div className="pt-36 w-[90vw] max-w-[1200px] m-auto">
          <Breadcrumbs page={'About'} />
        </div>
        <section className="w-[90vw] max-w-[1200px] m-auto flex flex-col  items-center gap-10 lg:flex-row lg:gap-20">
          <div>
            <h1 className="mb-5">
              Your ultimate destination for booking and renting out
              accommodations worldwide.
            </h1>
            <p>
              Welcome to Holidaze, your trusted partner for unique stays
              worldwide. We are dedicated to transforming travel experiences by
              connecting adventurers with memorable accommodations. Looking for
              a beachside haven, a mountain escape, or a cultural immersion in
              the city? You will find it all here.
            </p>
          </div>
          <div className="max-w-[500px] grid grid-cols-6 grid-rows-2 gap-3">
            <img
              className="decor-img col-span-4 row-span-2"
              src={aboutImgBathroom}
              alt="Luxurious bathroom"
            />

            <img
              className="decor-img col-span-2 row-span-1"
              src={aboutImgWindow}
              alt="Woman laying in bed looking at a nice view from her room"
            />
            <img
              className="decor-img col-span-2 row-span-1"
              src={aboutImgTub}
              alt="A tub filled with water and lemons"
            />
          </div>
        </section>
        <section className="text-center mt-20 bg-gray-100 p-20 space-y-4">
          <h2>Our Vision</h2>
          <p className="max-w-[900px] m-auto">
            We envision a world where travel inspires, connects, and creates
            lasting memories. Our goal is simple: be the preferred choice for
            both explorers and venue managers, offering a smooth and delightful
            experience to all.
          </p>
        </section>
        <section className="flex flex-col items-center gap-20 my-20 w-[90vw] max-w-[1200px] m-auto lg:flex-row-reverse">
          <div>
            <h2 className="mt-6 mb-3">For Travelers</h2>
            <p>
              Select from an array of global apartments, luxury villas, boutique
              hotels, and quaint B&Bs. Our user-friendly platform and travel
              experts will guide you towards your dream vacation. No matter your
              travel experience or desires, we are here to simplify your
              journey.
            </p>
          </div>
          <div className="w-[250px] relative mb-20 lg:pe-20 lg:w-[600px]">
            <img
              className="w-[200px] h-[300px] rounded-full shadow-lg lg:min-w-[300px] lg:h-[450px]"
              src={aboutTraveller}
              alt="Woman smiling on a hike in the nature"
            />
            <img
              className="w-[150px] h-[220px]  rounded-full absolute top-[150px] left-[110px] shadow-lg  lg:top-[220px] lg:left-[150px] lg:min-w-[200px] lg:h-[300px]"
              src={aboutBreakfast}
              alt="Table with a small breakfast"
            />
          </div>
        </section>
        <section className="py-20 lg:mt-20">
          <div className="w-[90vw] max-w-[1200px] flex flex-col items-center gap-20 m-auto lg:flex-row">
            <div className="lg:pe-16">
              <h2 className="mb-3">For Venue Managers</h2>
              <p>
                Holidaze provides an easy way for venue managers to share their
                unique spaces with global travelers. Listing your property is a
                breeze and our tools make management and bookings
                straightforward. Looking to amplify your earning potential? Our
                experts will help you highlight your property best features and
                attract the right guests.
              </p>
            </div>
            <div className="w-[250px] relative mb-20 lg:pe-10 lg:w-[600px]">
              <img
                className="w-[200px] h-[300px] rounded-full shadow-lg lg:min-w-[300px] lg:h-[450px]"
                src={venueMng2}
                alt="Woman smiling"
              />
              <img
                className="w-[150px] h-[220px] rounded-full absolute top-[150px] left-[110px] shadow-lg lg:top-[220px] lg:left-[-50px] lg:min-w-[200px] lg:h-[300px]"
                src={venueMng3}
                alt="Venue with pool and a nice view"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
