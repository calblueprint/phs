'use client';

import React, { useEffect, useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { RiTwitterXFill } from 'react-icons/ri';
import Link from 'next/link';
import supabase from '../../../supabase/client';
import { useWebDeviceDetection } from '../../../context/WindowWidthContext/WindowWidthContext';

type EmailInputProps = {
  inputValueName: string;
  inputValueEmail: string;
  subscribed: boolean;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
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
function Input({
  inputValueName,
  inputValueEmail,
  subscribed,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  showError,
  errorMsg,
}: EmailInputProps) {
  const isWebDevice = useWebDeviceDetection();
  return (
    <div>
      {!isWebDevice && (
        <div className="flex flex-col justify-center">
          <div className="bg-hunterGreen mt-2 pb-16">
            {subscribed && (
              <div className="flex flex-col items-center pt-20">
                <IoIosCheckmarkCircleOutline className="text-ivory text-5xl" />
                <h3 className="text-center font-['Lato'] pt-6">
                  THANK YOU FOR SUBSCRIBING
                </h3>
                <p className="w-[311px] text-center font-normal font-['Lato'] mt-2">
                  Please click the confirmation link sent to your inbox to
                  complete the subscription process. Thank you for joining us!
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
                    Sign up for our monthly news, events, and stories sent to
                    your inbox.
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
                  <Link href="https://www.facebook.com/PHSSPCA/">
                    <FaFacebook color="white" fontSize="1.3em" />
                  </Link>
                  <Link href="https://www.instagram.com/peninsulahumanesociety">
                    <FaInstagram color="white" fontSize="1.4em" />
                  </Link>
                  <Link href="https://twitter.com/peninsulahumane">
                    <RiTwitterXFill color="white" fontSize="1.4em" />
                  </Link>
                  <Link href="https://www.tiktok.com/@peninsulahumanesociety">
                    <FaTiktok color="white" fontSize="1.35em" />
                  </Link>
                  <Link href="https://www.youtube.com/user/peninsulaspca">
                    <FaYoutube color="white" fontSize="1.6em" />
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
                <div className="w-[12.5rem] m-auto px-4 py-1.5 bg-hunterGreen rounded-lg">
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
      )}
      {isWebDevice && (
        <div className="flex flex-col bg-scary-forest w-full">
          <div className="flex pt-24 justify-between">
            <div className="ml-56 flex flex-col w-[15.938rem] h-[13.438rem] gap-4">
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
            <div className="w-[9.375rem] flex flex-col gap-4 text-ivory active:text-[#bcc0bb]">
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
                <Link href="https://www.facebook.com/PHSSPCA/">
                  <FaFacebook color="white" fontSize="1.3em" />
                </Link>
                <Link href="https://www.instagram.com/peninsulahumanesociety">
                  <FaInstagram color="white" fontSize="1.4em" />
                </Link>
                <Link href="https://twitter.com/peninsulahumane">
                  <RiTwitterXFill color="white" fontSize="1.4em" />
                </Link>
                <Link href="https://www.tiktok.com/@peninsulahumanesociety">
                  <FaTiktok color="white" fontSize="1.35em" />
                </Link>
                <Link href="https://www.youtube.com/user/peninsulaspca">
                  <FaYoutube color="white" fontSize="1.6em" />
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
      )}
    </div>
  );
}

/**
 * @param root0 footer element thats at the bottom of every page. renders differentally based on whether its mobile or web.
 * @returns an email pop up.
 * if no email is entered and the user clicks the submit button, an error message will pop up.
 * if an invalid email is entered and the user clicks the submit button, another error message will pop up.
 * otherwise, if a valid email is submitted and properly subscribed, another pop up will appear that will tell the user they are subscribed and direct them to another page.
 */
export default function Footer() {
  const [inputValueName, setNameValue] = useState('');
  const [inputValueEmail, setEmailValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subbed = () =>
    Boolean(JSON.parse(window.sessionStorage.getItem('subscribed') || 'false'));
  const [subscribed, setSubscribed] = useState(subbed);

  useEffect(() => {
    window.sessionStorage.setItem('subscribed', subscribed.toString());
  }, [subscribed]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    setShowError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setShowError(false);
  };

  // const { error } = await supabase.from('emails').insert({ id: 1, name: 'Denmark' })

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|ca)$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // check name
    if (!inputValueName.trim()) {
      setShowError(true);
      const nameElem = document.getElementById('nameInput');
      if (nameElem) {
        nameElem.style.borderColor = 'red';
      }
      setErrorMsg('Please enter a name');
    } else if (!inputValueEmail.trim()) {
      // Handle the case for an empty email
      setShowError(true);
      const emailElem = document.getElementById('emailInput');
      if (emailElem) {
        emailElem.style.borderColor = 'red';
      }
      setErrorMsg('Please enter an email address');
    } else if (isValidEmail(inputValueEmail)) {
      // Handle the submission for a valid email
      try {
        // Insert the email into the Supabase database
        const { error } = await supabase
          .from('emails')
          .insert({ emails: inputValueEmail, first_name: inputValueName });
        // console.log('successfully inserted?');
      } catch (error) {
        // console.error(error);
        return error;
      }

      // miha's edits

      //
      setSubscribed(true);
      // console.log('Valid email:', inputValueEmail);
      // Additional logic for handling a valid email
    } else {
      // Handle the case for an invalid email
      setShowError(true);
      const emailElem = document.getElementById('emailInput');
      if (emailElem) {
        emailElem.style.borderColor = 'red';
      }
      setErrorMsg('Enter a valid email format (ex. example@mail.com)');
    }
    return null;
  };
  return (
    <div>
      <Input
        inputValueName={inputValueName}
        inputValueEmail={inputValueEmail}
        subscribed={subscribed}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handleSubmit={handleSubmit}
        showError={showError}
        errorMsg={errorMsg}
      />
    </div>
  );
}
