'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PiPaperPlaneTiltBold , PiSealCheck } from "react-icons/pi";
import { VscClose } from "react-icons/vsc";
import { BiErrorCircle } from "react-icons/bi";

import Link from 'next/link';


/**
 * @returns an email pop up
 */
export default function EmailPopup(
 ) {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [subscribed, setSubscribed] = useState(false);


  const closeModal = () => {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setShowError(false);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|ca)$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!inputValue.trim()) {
      // Handle the case for an empty email
      setShowError(true);
      setErrorMsg('Please enter an email address');
    } else if (isValidEmail(inputValue)) {
      // Handle the submission for a valid email
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-[334px] h-[404px] bg-[#EBF0E8] rounded-lg shadow-box relative">
                  
                  

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center duration-300 focus:outline-none"
                  
                      >
                      <VscClose 
                          className="text-4xl text-[#808080] pt-[17px] pr-[17px]"
                          onClick={closeModal}/>
                      </button>
                    </div>

                    {subscribed ? (
                      <><div className="absolute pt-[52px] top-[72px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <PiSealCheck className="text-[#3F6A38] text-5xl" />
                      </div>
                  
                      <h2 className="pt-[108px] pl-[32px] pr-[32px] text-center font-Lato font-bold text-[19px] text-[#3B3B3B]">
                        THANKS FOR SUBSCRIBING!
                      </h2>
                      
                      <p className="text-center text-sm font-Lato text-[#3B3B3B] pt-[10px] pl-[30px] pr-[30px] text-[16px]">
                      Your sign-up request was successful! Please check your email inbox to confirm.</p>
                      

                    <Link href="/collectionsPage" >

                      <div className="flex items-center justify-center pt-[24px]">
                      <button
                        type="button"
                        className="bg-[#7CA24E] w-[283px] h-[43px] text-white rounded-2xl p-[21px] mt-[8px] flex items-center justify-center"
                      >
                        Back to Home
                      </button>
                    </div>
                    </Link>

                      </>
                    ) : (
                      <>

                  <div className="absolute top-[102px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <PiPaperPlaneTiltBold className="text-[#3F6A38] text-4xl" />
                  </div>

                  <h2 className="pt-[108px] pl-[48.5px] pr-[48.5px] text-center font-Lato font-bold text-[19px] text-[#3B3B3B]">
                    JOIN OUR NEWSLETTER!
                  </h2>
                  <p className="text-center text-sm font-Lato text-[#3B3B3B] pt-[10px] pl-[30px] pr-[30px] text-[16px]">
                    Monthly updates on our work and involvement opportunities.
                  </p>


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

                  {showError && (
                    <div className="error-modal flex items-center">
                    {/* Display your error message or handle the error case */}
                    <div className="icon-container">
                      <BiErrorCircle className="ml-[26px] text-[#E94444] text-[11px]" />
                    </div>
                    <p className="pl-[2px] font-Lato text-[11px] text-[#E94444]">{errorMsg}</p>
                  </div>
                  )}
                
                </>
            )}

              </div>
            </div>



            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  );
}