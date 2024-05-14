'use client';

import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PiPaperPlaneTiltBold, PiSealCheck } from 'react-icons/pi';
import { VscClose } from 'react-icons/vsc';
import { BiErrorCircle } from 'react-icons/bi';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Link from 'next/link';
import supabase from '../../../supabase/client';
import { useWebDeviceDetection } from '../../../../context/WindowWidthContext/WindowWidthContext';

type EmailInputProps = {
  inputValueName: string;
  inputValueEmail: string;
  subscribed: boolean;
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
 * @param root0.subscribed if you successfully subscribed
 * @returns email input component
 */
function MobileInput({
  inputValueName,
  inputValueEmail,
  subscribed,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  showError,
  errorMsg,
}: EmailInputProps) {
  return (
    <div className="flex flex-col justify-center">
      <div className="bg-hunterGreen mt-2 pb-16">
        {subscribed && (
          <div className="flex flex-col items-center pt-20">
            <IoIosCheckmarkCircleOutline className="text-ivory text-5xl" />
            <h3 className="text-center font-['Lato'] pt-6">
              THANK YOU FOR SUBSCRIBING
            </h3>
            <p className="w-[311px] text-center font-normal font-['Lato'] mt-2">
              Please click the confirmation link sent to your inbox to complete
              the subscription process. Thank you for joining us!
            </p>
          </div>
        )}
        {!subscribed && (
          <div>
            <div>
              <h3 className="pt-12 text-center font-['Lato']">
                SUBSCRIBE TO OUR NEWSLETTER
              </h3>
            </div>
            <div>
              <p className="text-center m-auto w-[25rem] font-Lato font-normal text-white-smoke pt-2 pl-8 pr-8">
                Sign up for our monthly news, events, and stories sent to your
                inbox.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-[.875rem] pt-4">
              <input
                type="text"
                placeholder="First Name"
                value={inputValueName}
                required
                id="nameInput"
                onChange={handleNameChange}
                className={`focus:border-ivory valid:border-asparagus font-Lato text-sm bg-hunterGreen border border-silver rounded-md pl-3 w-[20.125rem] h-[3.125rem] items-center ${
                  inputValueName ? 'text-silver' : 'text-silver'
                }`}
              />
              <input
                type="text"
                placeholder="Email Address"
                value={inputValueEmail}
                id="emailInput"
                required
                onChange={handleEmailChange}
                className={`focus:border-ivory valid:border-asparagus font-Lato text-sm bg-hunterGreen border border-silver rounded-md pl-3 w-[20.125rem] h-[3.125rem] items-center ${
                  inputValueEmail ? 'text-silver' : 'text-silver'
                }`}
              />
              <button
                type="button"
                className="active:bg-[#bcc0bb] bg-white-smoke w-[20.125rem] h-[3.125rem] text-shadow font-[Lato] rounded-lg flex items-center justify-center"
                onClick={handleSubmit}
              >
                Subscribe
              </button>
              {showError && (
                <div className="error-modal flex items-center rounded-lg w-[20.125rem] bg-[#E94444] m-auto justify-center pt-[.625rem]">
                  {/* Display your error message or handle the error case */}
                  <div className="icon-container">
                    <BiErrorCircle className="text-ivory text-[12px]" />
                  </div>
                  <p className="pl-[2px] font-Lato text-[12px] text-ivory">
                    {errorMsg}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-scary-forest w-full pt-16">
        <div className="w-full flex-col justify-start items-center gap-5 inline-flex">
          <div className="flex-col justify-start items-center gap-2.5 flex">
            <div className="flex-col justify-start items-center gap-4 flex">
              <div className="flex-col justify-start items-center gap-1.5 flex">
                <p className="text-center font-normal font-['Lato']">
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
                  className="fill-current text-white active:text-[#bcc0bb]"
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
                  className="fill-current text-white active:text-[#bcc0bb]"
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
                  className="fill-current text-white active:text-[#bcc0bb]"
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
                  className="fill-current text-white active:text-[#bcc0bb]"
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
                  className="fill-current text-white active:text-[#bcc0bb]"
                >
                  <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <hr className="border-silver w-[322px] m-auto h-[.5px] mt-5 mb-8" />
        <div className="bg-scary-forest flex justify-around text-center text-ivory font-[Lato] gap-4 active:text-[#bcc0bb]">
          <div className="flex flex-col gap-4">
            <Link href="/hoursAdmissionPage">
              {' '}
              <p> Hours & Locations </p>{' '}
            </Link>
            <Link href="/siteMapPage">
              {' '}
              <p> Site Maps </p>{' '}
            </Link>
            <Link href="/featuredToursPage">
              {' '}
              <p> Featured Tours </p>{' '}
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/exhibitsPage">
              {' '}
              <p> Exhibits </p>{' '}
            </Link>
            <Link href="/newsFeedPage">
              {' '}
              <p> News </p>{' '}
            </Link>
            <Link href="/spotlightPage">
              {' '}
              <p> Wildlife Spotlights </p>{' '}
            </Link>
          </div>
        </div>
        <div className="w-full pt-6 gap-4 bg-scary-forest">
          <Link href="https://phs-spca.org">
            <div className="w-[200px] m-auto px-4 py-1.5 bg-hunterGreen rounded-lg">
              <div className="text-center text-silver text-xs font-normal font-['Lato'] active:text-[#bcc0bb]">
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
  );
}

/**
 *
 * @param root0 web component
 * @param root0.inputValueName name
 * @param root0.inputValueEmail email
 * @param root0.subscribed whether you subscribed
 * @param root0.handleNameChange change name func
 * @param root0.handleEmailChange change email func
 * @param root0.handleSubmit what to do when submit email name
 * @param root0.showError error
 * @param root0.errorMsg error
 * @returns web footer
 */
function WebInput({
  inputValueName,
  inputValueEmail,
  subscribed,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  showError,
  errorMsg,
}: EmailInputProps) {
  return (
    <div className="flex flex-col bg-scary-forest w-full">
      <div className="flex pt-24 justify-between">
        <div className="ml-56 flex flex-col w-[255px] h-[215px] gap-4">
          <Link href="/">
            <img
              src="https://phs-spca.org/wp-content/uploads/2017/03/PHSLogo.jpg"
              alt="Logo"
              className="object-contain"
              style={{ maxHeight: '100%', maxWidth: '50%' }}
            />
          </Link>
          <p className="text-sm font-normal">
            The Peninsula Humane Society & SPCA (PHS & SPCA) is a local,
            private, non-profit charitable organization dedicated to animal
            welfare.{' '}
          </p>
          <Link href="https://phs-spca.org">
            <div className="w-[200px] px-4 py-1.5 bg-hunterGreen rounded-lg">
              <div className="text-center text-silver text-xs font-normal font-['Lato'] active:text-[#bcc0bb]">
                Learn more about PHS/SPCA
              </div>
            </div>
          </Link>
        </div>
        <div className="w-[150px] flex flex-col gap-4 text-ivory active:text-[#bcc0bb]">
          <p className="text-silver s2"> VISIT </p>
          <Link href="/hoursAdmissionPage">
            {' '}
            <p> Hours & Location </p>
          </Link>
          <Link href="/siteMapPage">
            {' '}
            <p> Site Maps </p>
          </Link>
          <Link href="/featuredToursPage">
            {' '}
            <p> Featured Tours</p>{' '}
          </Link>
        </div>
        <div className="w-[150px] flex flex-col gap-4 text-ivory active:text-[#bcc0bb]">
          <p className="text-silver s2"> LEARN & EXPLORE </p>
          <Link href="/exhibitsPage">
            {' '}
            <p> Exhibits </p>
          </Link>
          <Link href="/newsFeedPage">
            {' '}
            <p> News </p>{' '}
          </Link>
          <Link href="/spotlightPage">
            {' '}
            <p>Wildlife Spotlights</p>{' '}
          </Link>
        </div>
        <div className="flex flex-col gap-4 s1 mr-56">
          <p className="text-silver s2"> CONTACT US </p>
          <p className="leading-tight">
            {' '}
            5333 Zoo Drive <br /> Los Angeles, CA 90027{' '}
          </p>
          <p> (323) 644-4200 </p>
          <p className="leading-tight">
            {' '}
            Open today from: <br />
            9:30 AM – 5:00 PM{' '}
          </p>
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
                className="fill-current text-white active:text-[#bcc0bb]"
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
                className="fill-current text-white active:text-[#bcc0bb]"
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
                className="fill-current text-white active:text-[#bcc0bb]"
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
                className="fill-current text-white active:text-[#bcc0bb]"
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
                className="fill-current text-white active:text-[#bcc0bb]"
              >
                <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex mt-12">
        <p className="text-silver ml-56 text-base font-normal font-['Lato']">
          Copyright © 2024 Peninsula Humane Society & SPCA{' '}
        </p>
        <Link
          href="https://phs-spca.org/privacy-policy/"
          className="ml-8 pb-10 text-center flex justify-center text-silver text-normal font-normal font-['Lato'] underline"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
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
export default function Footer() {
  const isWebDevice = useWebDeviceDetection();
  const [inputValueName, setNameValue] = useState('');
  const [inputValueEmail, setEmailValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
    // check name
    if (!inputValueName.trim()) {
      setShowError(true);
      document.getElementById('nameInput').style.borderColor = 'red';
      setErrorMsg('Please enter a name');
    } else if (!inputValueEmail.trim()) {
      // Handle the case for an empty email
      setShowError(true);
      document.getElementById('emailInput').style.borderColor = 'red';
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
      document.getElementById('emailInput').style.borderColor = 'red';
      setErrorMsg('Enter a valid email format (ex. example@mail.com)');
    }
  };

  return (
    <div>
      {isWebDevice && (
        <MobileInput
          inputValueName={inputValueName}
          inputValueEmail={inputValueEmail}
          subscribed={subscribed}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleSubmit}
          showError={showError}
          errorMsg={errorMsg}
        />
      )}
      {isWebDevice && (
        <WebInput
          inputValueName={inputValueName}
          inputValueEmail={inputValueEmail}
          subscribed={subscribed}
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
