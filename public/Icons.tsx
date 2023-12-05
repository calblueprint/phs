import React from 'react';

/**
 * @returns the HamburgerMenu icon
 */
export function HamburgerMenu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M20.0007 28.3332L31.6673 28.3332M8.33398 19.9998H31.6673M8.33398 11.6665H31.6673"
        stroke="#FFFDF7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @returns the CloseMenu icon
 */
export function CloseMenu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M21.8754 21.8749L3.12549 3.125M21.8755 3.125L3.12549 21.8751"
        stroke="#FFFDF7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @returns the BackArrow icon
 */
export function BackArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M15.75 9H2.25M2.25 9L6 12.75M2.25 9L6 5.25"
        stroke="#386131"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @returns the NextArrow icon
 */
export function NextArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M2.25 9H15.75M15.75 9L12 5.25M15.75 9L12 12.75"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @returns the Caret Left icon
 */
export function CaretLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="23"
      viewBox="0 0 15 23"
      fill="none"
    >
      <path
        d="M13 2L3 11.5L13 21"
        stroke="#386131"
        strokeOpacity="0.17"
        strokeWidth="3.16667"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * @returns the Caret Right icon
 */
export function CaretRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="23"
      viewBox="0 0 15 23"
      fill="none"
    >
      <path
        d="M2 2L12 11.5L2 21"
        stroke="#D7E1CE"
        strokeOpacity="0.22"
        strokeWidth="3.16667"
        strokeLinecap="round"
      />
    </svg>
  );
}
