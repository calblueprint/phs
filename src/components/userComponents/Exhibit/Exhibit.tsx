import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

/**
 *
 * @param root0
 * @param root0.title
 * @param root0.createdAt
 * @param root0.contentLink
 * @param root0.id
 * @returns exhibit component
 */

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
  function BackButton() {
    return (
      <button type="button" style={{ backgroundColor: '#4b711d' }} onClick={goBack}>
        {' '}
        <IoIosArrowRoundBack size={40} />
      </button>
    );
  }
  
/**
 *
 * @param root0
 * @param root0.title
 * @param root0.createdAt
 * @param root0.contentLink
 * @param root0.id
 * @returns exhibit page
 */
export default function Exhibit({
    title,
    createdAt,
    contentLink,
    id,
  }: {
    title: string;
    createdAt: string;
    contentLink: string;
    id: string;
  }) {
    return (
      <li key={id} />
    );
  }