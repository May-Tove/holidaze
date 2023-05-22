import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContactForm from '../../components/Forms/ContactForm';
import { BiGroup } from 'react-icons/bi';
import { RiCustomerService2Line, RiQuestionnaireLine } from 'react-icons/ri';
import { TbHome } from 'react-icons/tb';
import office from '../../assets/office.jpg';
import customerService from '../../assets/customer_service.jpg';

export const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Holidaze</title>
        <meta
          name="description"
          content="Get in touch with the Holidaze team. Whether you have a question, need assistance, or have feedback, we're here to help."
        />
      </Helmet>
      <main>
        <div className="pt-28 w-[90vw] max-w-[1100px] m-auto">
          <Breadcrumbs page={'Contact'} />
        </div>
        <section className="flex flex-col items-center xl:items-start xl:flex-row gap-20 mb-10 w-[90vw] max-w-[1100px] m-auto">
          <div className="space-y-5">
            <h1 className="mb-5">We would Love to Hear from You!</h1>
            <p>
              We are available to help you and respond to any questions or
              comments you may have. Our devoted support staff is prepared to
              offer you the help you require to make your holiday experience
              great.
            </p>
            <p>
              We appreciate your comments and recommendations as they enable us
              to improve our services and make Holidaze a better experience for
              you. Your suggestions will be extremely helpful to us in achieving
              our aim of offering the best possible level of customer
              satisfaction.
            </p>
            <ContactForm />
          </div>
          <div className="w-[250px] relative mb-20 md:w-[450px] xl:w-[650px] xl:pe-10 m-auto">
            <img
              className="w-[200px] h-[300px] rounded-full shadow-lg md:w-[250px] md:h-[380px] xl:min-w-[350px] xl:h-[530px]"
              src={customerService}
              alt="Customer service team talking in headphones"
            />
            <img
              className="w-[150px] rounded-full shadow-lg absolute top-[150px] left-[110px] md:top-[170px] md:left-[160px] md:w-[200px] xl:top-[220px] xl:left-[220px]  xl:min-w-[250px] xl:h-[390px]"
              src={office}
              alt="Office desk"
            />
          </div>
        </section>
        <section className="bg-primaryLight grid grid-cols-1 gap-16 m-auto px-5 py-16 mt-3 lg:py-20 lg:px-40 lg:mt-20 lg:grid-cols-2 lg:gap-28">
          <div className="flex gap-3 items-start">
            <div className="mt-2 rounded-full w-fit h-10 flex items-center bg-primary text-primaryDark p-2 lg:h-16 lg:text-3xl">
              <RiQuestionnaireLine />
            </div>
            <div>
              <h2>General Inquiries</h2>
              <p>
                For general inquiries, questions about our services, or
                assistance with your account, our team is just an email away.
                Please send your message to contact@holidaze.com, and we will
                respond promptly.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-2 rounded-full w-fit h-10 flex items-center bg-primary text-primaryDark p-2 lg:h-16 lg:text-3xl">
              <BiGroup />
            </div>
            <div>
              <h2>Collaborations and Partnerships</h2>
              <p>
                We are forward to working together with companies that share our
                passion for providing excellent travel experiences. If you are
                interested in working with Holidaze as a partner, send us an
                email at partnership@holidaze.com, and our partnership team
                would be happy to discuss opportunities with you.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-2 rounded-full w-fit h-10 flex items-center bg-primary text-primaryDark p-2 lg:h-16 lg:text-3xl">
              <RiCustomerService2Line />
            </div>
            <div>
              <h2>Customer Support</h2>
              <p>
                Our customer support team is here to help if you require
                immediate assistance or have specific inquiries about a booking.
                Call us at +1-123-123-1234 from Monday through Friday from 8 AM
                to 7 PM to get in touch with us.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-2 rounded-full w-fit h-10 flex items-center bg-primary text-primaryDark p-2 lg:h-16 lg:text-3xl">
              <TbHome />
            </div>
            <div>
              <h2>Venue Managers</h2>
              <p>
                Our venue manager support team is available to help you if you
                are a venue manager interested in advertising your
                accommodations with Holidaze or have questions about maintaining
                your current listings. Send us an email at
                venue.manager@holidaze.com, and we will provide you with the
                guidance and assistance you require.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
