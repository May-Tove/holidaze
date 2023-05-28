import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContactForm from '../../components/Forms/ContactForm';
import office from '../../assets/office.jpg';
import customerService from '../../assets/customer_service.jpg';
import SEOHelmet from '../../components/SEOHelmet';

export const Contact = () => {
  return (
    <>
      <SEOHelmet
        title={'Contact | Holidaze'}
        description={
          "Get in touch with the Holidaze team. Whether you have a question, need assistance, or have feedback, we're here to help."
        }
      />

      <main className="main-layout">
        <div>
          <Breadcrumbs page={'Contact'} />
        </div>
        <section className="flex flex-col items-center xl:items-start xl:flex-row gap-20">
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
      </main>
    </>
  );
};
