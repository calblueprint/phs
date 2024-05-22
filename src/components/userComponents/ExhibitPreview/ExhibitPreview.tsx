'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ExhibitPreview.module.css';


/**
 *
 * @param props - props for the ExhibitPreview component
 * @param props.name - name of the exhibit
 * @param props.location - location of the exhibit
 * @param props.description - description of the exhibit
 * @param props.about - about the exhibit
 * @param props.topimage - top image of the exhibit
 * @param props.bottomimage - bottom image of the exhibit
 * @param props.href - href of the exhibit
 * @returns JSX.Element
 */
export default function ExhibitPreview({
  name,
  location,
  description,
  about,
  topimage,
  bottomimage,
  href,
}: {
  name: string;
  location: string;
  description: string;
  about: string;
  topimage: string;
  bottomimage: string;
  href: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-blue-200">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-opacity-50 duration-300 shadow-xl"
        >
          Open Me
        </button>
      </div>

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
              <div className={styles.roundedbackground}>
                <div className={styles.buttonbox}>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                    onClick={closeModal}
                  >
                    x
                  </button>
                </div>

                <div className={styles.rectangle}>
                  <div className={styles.titlebox}>
                    <h1 className={styles.titletext}>{name}</h1>
                  </div>

                  <div className={styles.locationbox}>
                    <p className={styles.locationtext}>{location}</p>
                  </div>

                  <div className={styles.descriptionbox}>
                    <p className={styles.descriptiontext}>{description}</p>
                  </div>

                  <div className={styles.aboutbox}>
                    <h1 className={styles.abouttext}>{about}</h1>
                  </div>

                  <Link href={href}>
                    <div className={styles.picturebox}>
                      <Image
                        src={bottomimage}
                        alt="exhibit display"
                        width={354}
                        height={150}
                        priority
                      />
                    </div>
                  </Link>
                </div>

                <div className={styles.topimagebox}>
                  <Image
                    src={topimage}
                    alt="exhibit display"
                    width={398}
                    height={800}
                    priority
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
