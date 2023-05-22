import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SuccessMessage from '../../../shared/successMessage';
import { NAME_REGEX } from '../../../shared';

/**
 * `ContactForm` component represents a contact form where users can provide their name, email, and message.
 * It uses 'react-hook-form' for handling form state and form validation.
 *
 * @component
 * @returns {React.ElementType} Returns the ContactForm component
 */
const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    reset();

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="relative">
          <input
            type="text"
            id="name"
            className="floating-input peer"
            placeholder=" "
            {...register('name', { required: true, pattern: NAME_REGEX })}
          />
          <label htmlFor="name" className="floating-label">
            Name
          </label>
        </div>
        {errors.name && (
          <span className="text-red-900 text-sm mt-1">
            This field is required and can only contain letters, numbers, and
            underscores.
          </span>
        )}
      </div>
      <div>
        <div className="relative">
          <input
            type="email"
            id="email"
            className="floating-input peer"
            placeholder=" "
            {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
          />
          <label htmlFor="email" className="floating-label">
            Email
          </label>
        </div>
        {errors.email && (
          <span className="text-red-900 text-sm">
            This field is required and must be a valid email address.
          </span>
        )}
      </div>
      <div>
        <div className="relative">
          <textarea
            type="text"
            id="message"
            className="h-[150px] floating-textarea peer"
            placeholder=" "
            {...register('message', { required: true, minLength: 15 })}
          />
          <label htmlFor="message" className="floating-label">
            Message
          </label>
        </div>
        {errors.message && (
          <span className="text-red-900 text-sm">
            Message must be at least 15 characters long.
          </span>
        )}
      </div>

      <button className="btn" type="submit">
        Submit
      </button>
      {success && (
        <SuccessMessage message="Your message has been sent. Thank you for contacting Holidaze!" />
      )}
    </form>
  );
};

export default ContactForm;
