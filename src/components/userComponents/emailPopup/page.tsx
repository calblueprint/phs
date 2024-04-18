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
      <div>
        <div className="bg-hunterGreen">
          <div>
            <h3 className="pt-12 text-center font-Lato font-bold text-ivory">
              SUBSCRIBE TO OUR NEWSLETTER!
            </h3>
          </div>
          <div>
            <p className="text-center font-Lato font-normal text-ivory pt-2 pl-8 pr-8">
              Sign up for our monthly news, events, and stories sent to your
              inbox.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3.5 pt-4">
            <input
              type="text"
              placeholder="First Name"
              value={inputValueName}
              onChange={handleNameChange}
              className={`font-Lato text-sm bg-hunterGreen border border-silver rounded-md pl-3 w-[322px] h-[43px] items-center ${
                inputValueName ? 'text-silver' : 'text-silver'
              }`}
            />
            <input
              type="text"
              placeholder="Email Address"
              value={inputValueEmail}
              onChange={handleEmailChange}
              className={`font-Lato text-sm bg-hunterGreen border border-silver rounded-md pl-3 w-[322px] h-[43px] items-center ${
                inputValueEmail ? 'text-silver' : 'text-silver'
              }`}
            />
            <button
              type="button"
              className="active:bg-[#bcc0bb] bg-white-smoke mb-16 w-[322px] h-[43px] text-shadow font-[Lato] rounded-lg p-5 mt-2 flex items-center justify-center"
              onClick={handleSubmit}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="bg-scary-forest w-full">
          <div className="w-full flex-col justify-start items-center gap-5 inline-flex">
            <div className="flex-col justify-start items-center gap-2.5 flex">
              <div className="flex-col justify-start items-center gap-4 flex">
                <div className="flex-col justify-start items-center gap-1.5 flex">
                  <p className="mt-8 text-center font-normal font-['Lato']">
                    CONNECT WITH US
                  </p>
                </div>
              </div>
              <div className="justify-start items-start gap-2.5 inline-flex">
                <Link
                  href="https://www.facebook.com/PHSSPCA/"
                  className="w-[27px] h-[27px] justify-center items-center flex"
                >
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    className="fill-current text-white"
                  >
                    <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/peninsulahumanesociety"
                  className="w-[27px] h-[27px] justify-center items-center flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    className="fill-current text-white"
                  >
                    <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com/peninsulahumane"
                  className="w-[27px] h-[27px] justify-center items-center flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    className="fill-current text-white"
                  >
                    <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.tiktok.com/@peninsulahumanesociety"
                  className="w-[27px] h-[27px] justify-center items-center flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    className="fill-current text-white"
                  >
                    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.104,4,24,4z M22.689,13.474 c-0.13,0.012-0.261,0.02-0.393,0.02c-1.495,0-2.809-0.768-3.574-1.931c0,3.049,0,6.519,0,6.577c0,2.685-2.177,4.861-4.861,4.861 C11.177,23,9,20.823,9,18.139c0-2.685,2.177-4.861,4.861-4.861c0.102,0,0.201,0.009,0.3,0.015v2.396c-0.1-0.012-0.197-0.03-0.3-0.03 c-1.37,0-2.481,1.111-2.481,2.481s1.11,2.481,2.481,2.481c1.371,0,2.581-1.08,2.581-2.45c0-0.055,0.024-11.17,0.024-11.17h2.289 c0.215,2.047,1.868,3.663,3.934,3.811V13.474z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.youtube.com/user/peninsulaspca"
                  className="w-[27px] h-[27px] justify-center items-center flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    className="fill-current text-white"
                  >
                    <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <hr className="border-silver w-[322px] m-auto h-[.5px] mt-5 mb-8" />
          <div className="bg-scary-forest flex justify-around text-center text-ivory font-[Lato] gap-4">
            <div className="flex flex-col gap-4">
              <p> Hours & Locations </p>
              <p> Site Maps </p>
              <p> Featured Tours </p>
            </div>
            <div className="flex flex-col gap-4">
              <p> Exhibits </p>
              <p> News </p>
              <p> Wildlife Spotlights </p>
            </div>
          </div>
          <div className="w-full pt-6 gap-4 bg-scary-forest">
            <Link href="/">
              <div className="w-[200px] m-auto px-4 py-1.5 bg-hunterGreen rounded-lg">
                <div className="text-center text-silver text-xs font-normal font-['Lato']">
                  Learn more about PHS/SPCA
                </div>
              </div>
              <div className="mt-4 text-zinc-500 text-center text-xs font-normal font-['Lato']">
                Copyright © 2024 Peninsula Humane Society & SPCA{' '}
              </div>
            </Link>
            <Link
              href="https://phs-spca.org/privacy-policy/"
              className="mt-1 pb-10 text-center flex justify-center text-zinc-500 text-xs font-normal font-['Lato'] underline"
            >
              Privacy Policy
            </Link>
          </div>
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
    <div className="flex flex-col justify-center">
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
