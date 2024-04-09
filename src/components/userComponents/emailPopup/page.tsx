'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PiPaperPlaneTiltBold, PiSealCheck } from 'react-icons/pi';
import { VscClose } from 'react-icons/vsc';
import { BiErrorCircle } from 'react-icons/bi';
import Link from 'next/link';
import supabase from '../../../supabase/client';

/**
 *
 * @param root0
 * @param root0.backLink
 */
function EmailSuccess({ backLink }: { backLink: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <div>
        <PiSealCheck className="text-[#3F6A38] text-5xl mb-2.5" />
      </div>
      <div>
        <h2 className="pl-[32px] pr-[32px] text-center font-Lato font-bold text-[19px] text-[#3B3B3B]">
          THANKS FOR SUBSCRIBING!
        </h2>
      </div>
      <div>
        <p className="text-center text-sm font-Lato text-[#3B3B3B] pt-[10px] pl-[30px] pr-[30px] text-[16px]">
          Your sign-up request was successful! Please check your email inbox to
          confirm.
        </p>
      </div>

      <Link href={backLink}>
        <div className="flex items-center justify-center pt-[24px]">
          <button
            type="button"
            className="bg-[#7CA24E] w-[283px] h-[43px] text-white rounded-2xl p-[21px] mt-[8px] flex items-center justify-center"
          >
            Back to Home
          </button>
        </div>
      </Link>
    </div>
  );
}

type EmailInputProps = {
  inputValue: string;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
  showError: boolean;
  errorMsg: string;
};

/**
 *
 * @param root0
 * @param root0.inputValue
 * @param root0.handleChange
 * @param root0.handleSubmit
 * @param root0.showError
 * @param root0.errorMsg
 */
function EmailInput({
  inputValue,
  handleChange,
  handleSubmit,
  showError,
  errorMsg,
}: EmailInputProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="mb-2.5">
          <PiPaperPlaneTiltBold className="text-[#3F6A38] text-4xl" />
        </div>

        <div>
          <h2 className="pt-[10px] pl-[48.5px] pr-[48.5px] text-center font-Lato font-bold text-[19px] text-[#3B3B3B]">
            JOIN OUR NEWSLETTER!
          </h2>
        </div>
        <div>
          <p className="text-center text-sm font-Lato text-[#3B3B3B] pt-[10px] pl-[30px] pr-[30px] text-[16px]">
            Monthly updates on our work and involvement opportunities.
          </p>
        </div>
        <div className="flex items-center justify-center pt-[15px]">
          <input
            type="text"
            placeholder="Enter your email"
            value={inputValue}
            onChange={handleChange}
            className={`font-Lato text-sm bg-gray-100 border rounded-md pl-[13px] w-[283px] h-[43px] items-center ${
              inputValue ? 'text-black' : 'text-[#BDBDBD]'
            }`}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="button"
            className="bg-[#7CA24E] w-[283px] h-[43px] text-white rounded-2xl p-[21px] mt-[8px] flex items-center justify-center"
            onClick={handleSubmit}
          >
            Subscribe
          </button>
        </div>
      </div>

      {showError && (
        <div className="error-modal flex items-center">
          {/* Display your error message or handle the error case */}
          <div className="icon-container">
            <BiErrorCircle className="ml-[26px] text-[#E94444] text-[11px]" />
          </div>
          <p className="pl-[2px] font-Lato text-[11px] text-[#E94444]">
            {errorMsg}
          </p>
        </div>
      )}
    </>
  );
}

/**
 * @param root0
 * @param root0.backLink
 * @param root0
 * @param root0.backLink
 * @returns an email pop up.
 * if no email is entered and the user clicks the submit button, an error message will pop up.
 * if an invalid email is entered and the user clicks the submit button, another error message will pop up.
 * otherwise, if a valid email is submitted and properly subscribed, another pop up will appear that will tell the user they are subscribed and direct them to another page.
 */
export default function EmailPopup({ backLink }: { backLink: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = e => {
    setInputValue(e.target.value);
    setShowError(false);
  };

  // const { error } = await supabase.from('emails').insert({ id: 1, name: 'Denmark' })

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|ca)$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!inputValue.trim()) {
      // Handle the case for an empty email
      setShowError(true);
      setErrorMsg('Please enter an email address');
    } else if (isValidEmail(inputValue)) {
      // Handle the submission for a valid email
      try {
        // Insert the email into the Supabase database
        const { error } = await supabase
          .from('emails')
          .insert({ emails: inputValue });
      } catch (error) {
        console.error(error);
        return error;
      }

      // miha's edits

      //
      setSubscribed(true);
      console.log('Valid email:', inputValue);
      // Additional logic for handling a valid email
    } else {
      // Handle the case for an invalid email
      setShowError(true);
      setErrorMsg('Enter a valid email format (ex. example@mail.com)');
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF0E8] flex flex-col justify-center">
      {subscribed ? (
        <EmailSuccess backLink={backLink} />
      ) : (
        <EmailInput
          inputValue={inputValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          showError={showError}
          errorMsg={errorMsg}
        />
      )}
    </div>
  );
}
