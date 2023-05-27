import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SuccessMessage from '../../../shared/successMessage';
import { NAME_REGEX, EMAIL_REGEX } from '../../../shared';

/**
 * `ContactForm` component represents a contact form where users can provide their name, email, and message.
 * It uses 'react-hook-form' for handling form state and form validation.
 *
 * @component
 * @returns {React.ElementType} Returns the ContactForm component
 */
const ContactForm = () => {
  const [success, setSuccess] = useState(false);

  const schema = yup
    .object({
      name: yup
        .string()
        .required()
        .matches(
          NAME_REGEX,
          'Name can only contain letters, numbers and underscores.'
        ),
      email: yup
        .string()
        .required()
        .matches(
          EMAIL_REGEX,
          'Email address must be a valid noroff.no or stud.noroff.no email address.'
        ),

      message: yup.string().required().min(15),
    })
    .required();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
            {...register('name')}
          />
          <label htmlFor="name" className="floating-label">
            Name
          </label>
        </div>
        <p id="inputError">{errors.name?.message}</p>
      </div>
      <div>
        <div className="relative">
          <input
            type="email"
            id="email"
            className="floating-input peer"
            placeholder=" "
            {...register('email')}
          />
          <label htmlFor="email" className="floating-label">
            Email
          </label>
        </div>
        <p id="inputError">{errors.email?.message}</p>
      </div>
      <div>
        <div className="relative">
          <textarea
            type="text"
            id="message"
            className="h-[150px] floating-textarea peer"
            placeholder=" "
            {...register('message')}
          />
          <label htmlFor="message" className="floating-label">
            Message
          </label>
        </div>
        <p id="inputError">{errors.message?.message}</p>
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
