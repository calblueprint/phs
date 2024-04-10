import React from 'react';

/**
 * @param evt on click of button
 */
function goBack(evt: React.SyntheticEvent) {
    // ignore the native anchor action
    evt.preventDefault();
  
    window.history.back();
  }
  
  /**
   * @returns back button
   */
  export default function BackButton() {
    return (
      <button type="button" onClick={goBack} className="text-scary-forest">
        {' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
      >
        <path
          d="M17.5 10H2.5M2.5 10L6.66667 14.1667M2.5 10L6.66667 5.83337"
          stroke="#386131"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      </button>
    );
  }
  