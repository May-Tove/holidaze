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
        <div className="pt-28 w-[90vw] max-w-[1100px] m-auto">
          <Breadcrumbs page={'About'} />
        </div>
        <section className="w-[90vw] max-w-[1100px] m-auto flex flex-col  items-center gap-10 lg:flex-row lg:gap-20">
          <div>
            <h1 className="mb-5">
              Your ultimate destination for booking and renting out
              accommodations worldwide.
            </h1>
            <p>
              We are passionate about making travel experiences extraordinary by
              connecting travelers with unique and memorable places to stay.
              Whether you are seeking a relaxing beachside retreat, an
              adventurous mountain getaway, or a cultural city escape, Holidaze
              has you covered.
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
            We believe that travel has the power to transform lives. We strive
            to be the go-to platform for travelers and venue managers alike,
            providing a seamless and enjoyable experience for everyone involved.
            Our vision is to inspire exploration, foster connections, and create
            lifelong memories for our community of global travelers.
          </p>
        </section>
        <section className="flex flex-col items-center gap-20 my-20 w-[90vw] max-w-[1100px] m-auto lg:flex-row-reverse">
          <div>
            <h2 className="mt-6 mb-3">For Travelers</h2>
            <p>
              Finding the perfect accommodation is essential to a remarkable
              travel experience. Here you can choose between a diverse selection
              of accommodations across the globe. From cozy apartments and
              boutique hotels to luxurious villas and charming bed and
              breakfasts, our user-friendly platform ensures you can find the
              perfect home away from home. Our team of travel experts is
              dedicated to helping you plan your dream vacation. We provide
              personalized recommendations based on your preferences, budget,
              and travel aspirations. Whether you are a seasoned traveller or
              venturing into uncharted territories, we are here to make your
              travel planning stress-free.
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
        <section className=" bg-gray-100 py-20 lg:mt-20">
          <div className="w-[90vw] max-w-[1100px] flex flex-col items-center gap-20 m-auto lg:flex-row">
            <div className="lg:pe-16">
              <h2 className="mb-3">For Venue Managers</h2>
              <p>
                If you are a venue manager looking to share your unique space
                with the world, Holidaze offers a platform to connect with a
                global audience of travelers. Listing your property with us is
                simple, and our user-friendly tools allow you to manage your
                accommodations and keep track of bookings effortlessly. We
                understand the importance of maximizing your earning potential.
                Our team of experts is here to guide you through the process,
                helping you showcase the best features from your property and
                attract discerning guests. Let us help you unlock the true
                potential of your property and reach a wider audience of
                travelers.
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
        <div className="text-center m-auto my-28 w-[90vw] max-w-[1100px]">
          <h2 className="mt-6 mb-3">Join the Holidaze Community</h2>
          <p>
            Whether you are embarking on a new adventure or opening the doors of
            your property to the world, Holidaze welcomes you to join our
            vibrant community. We value the trust and relationships we build
            with our customers and property owners, and we are committed to
            providing exceptional service and support every step of the way.
            Discover a world of possibilities with Holidaze. Book your next
            unforgettable stay or become part of our network of extraordinary
            accommodations. Let us help you create memories that will last a
            lifetime.
          </p>
        </div>
      </main>
    </>
  );
};
