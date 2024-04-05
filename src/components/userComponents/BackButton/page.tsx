import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

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
        <IoIosArrowRoundBack size={40} />
      </button>
    );
  }
  