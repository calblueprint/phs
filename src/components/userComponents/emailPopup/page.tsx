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
  inputValueName: string;
  inputValueEmail: string;
  handleNameChange: (e: any) => void;
  handleEmailChange: (e: any) => void;
  handleSubmit: (e: any) => void;
  showError: boolean;
  errorMsg: string;
};

/**
 *
 * @param root0 overall
 * @param root0.inputValueName name input
 * @param root0.inputValueEmail email input
 * @param root0.handleSubmit submit change
 * @param root0.showError shows error
 * @param root0.errorMsg error message
 * @param root0.handleNameChange when change name input
 * @param root0.handleEmailChange when change email input
 * @returns email input component
 */
function EmailInput({
  inputValueName,
  inputValueEmail,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  showError,
  errorMsg,
}: EmailInputProps) {
  return (
    <>
      <div className="bg-hunterGreen w-full flex flex-col items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div>
          <h2 className="mt-10 pt-[10px] pl-[48.5px] pr-[48.5px] text-center font-Lato font-bold text-[19px] text-ivory">
            SUBSCRIBE TO OUR NEWSLETTER!
          </h2>
        </div>
        <div>
          <p className="text-center text-sm font-Lato text-ivory pt-[10px] pl-[30px] pr-[30px] text-[16px]">
            Sign up for our monthly news, events, and stories sent to your
            inbox.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3.5 pt-[15px]">
          <input
            type="text"
            placeholder="First Name"
            value={inputValueName}
            onChange={handleNameChange}
            className={`font-Lato text-sm bg-gray-100 border rounded-md pl-[13px] w-[283px] h-[43px] items-center ${
              inputValueName ? 'text-black' : 'text-[#BDBDBD]'
            }`}
          />
          <input
            type="text"
            placeholder="Email Address"
            value={inputValueEmail}
            onChange={handleEmailChange}
            className={`font-Lato text-sm bg-gray-100 border rounded-md pl-[13px] w-[283px] h-[43px] items-center ${
              inputValueEmail ? 'text-black' : 'text-[#BDBDBD]'
            }`}
          />
          <button
            type="button"
            className="bg-[#7CA24E] w-[283px] h-[43px] text-white rounded-2xl p-[21px] mt-[8px] flex items-center justify-center"
            onClick={handleSubmit}
          >
            Subscribe
          </button>
        </div>
        <div className="w-[322px] h-[76.79px] flex-col justify-start items-center gap-5 inline-flex">
          <div className="flex-col justify-start items-center gap-2.5 flex">
            <div className="flex-col justify-start items-center gap-[15px] flex">
              <div className="flex-col justify-start items-center gap-1.5 flex">
                <div className="text-center text-white text-base font-normal font-['Lato']">
                  CONNECT WITH US
                </div>
              </div>
            </div>
            <div className="justify-start items-start gap-2.5 inline-flex">
              <div className="w-[27px] h-[27px] justify-center items-center flex">
                <img
                  className="w-[27px] h-[27px]"
                  src="https://via.placeholder.com/27x27"
                />
              </div>
              <div className="w-[27px] h-[27.79px] flex-col justify-center items-center inline-flex">
                <img
                  className="w-[27px] h-[27.79px]"
                  src="https://via.placeholder.com/27x28"
                />
              </div>
              <div className="w-[27px] h-[27px] justify-center items-center flex">
                <img
                  className="w-[27px] h-[27px]"
                  src="https://via.placeholder.com/27x27"
                />
              </div>
              <div className="w-[27px] h-[27px] justify-center items-center flex">
                <img
                  className="w-[27px] h-[27px]"
                  src="https://via.placeholder.com/27x27"
                />
              </div>
              <div className="w-[27px] h-[27px] justify-center items-center flex">
                <img
                  className="w-[27px] h-[27px]"
                  src="https://via.placeholder.com/27x27"
                />
              </div>
            </div>
          </div>
          <div className="w-[322px] h-[0px] border border-neutral-200" />
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
  const [inputValueName, setNameValue] = useState('');
  const [inputValueEmail, setEmailValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNameChange = e => {
    setNameValue(e.target.value);
    setShowError(false);
  };

  const handleEmailChange = e => {
    setEmailValue(e.target.value);
    setShowError(false);
  };

  // const { error } = await supabase.from('emails').insert({ id: 1, name: 'Denmark' })

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|ca)$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!inputValueEmail.trim()) {
      // Handle the case for an empty email
      setShowError(true);
      setErrorMsg('Please enter an email address');
    } else if (isValidEmail(inputValueEmail)) {
      // Handle the submission for a valid email
      try {
        // Insert the email into the Supabase database
        const { error } = await supabase
          .from('emails')
          .insert({ emails: inputValueEmail, first_name: inputValueName });
        console.log('successfully inserted?');
      } catch (error) {
        console.error(error);
        return error;
      }

      // miha's edits

      //
      setSubscribed(true);
      console.log('Valid email:', inputValueEmail);
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
          inputValueName={inputValueName}
          inputValueEmail={inputValueEmail}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleSubmit}
          showError={showError}
          errorMsg={errorMsg}
        />
      )}
    </div>
  );
}
