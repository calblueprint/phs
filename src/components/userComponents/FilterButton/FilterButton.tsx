import React, { useState } from 'react';

// interface FilterButtonProps {
//   content: string;
//   onClick?: () => void;
// }
interface FilterButtonProps {
  content: string;
  onClick: () => void;
  isSelected: boolean; // Added isSelected prop
}

/**
 *
 * @param onClick.content
 * @param onClick function to handle the functionality we want to tie to our filter buttons
 * @param content is the content to be rendered in the button
 * @param root0.onClick
 * @param onClick.onClick
 */

/**
 *
 */
function FilterButton({ content, onClick, isSelected }: FilterButtonProps) {
  const selectedStyle = 'bg-mint-cream text-scary-forest';

  const buttonClass = `py-2 px-6 whitespace-nowrap border-[0.8px] border-scary-forest border-solid text-night flex-grow ${
    isSelected ? selectedStyle : ''
  }`;

  return (
    <button type="button" className={buttonClass} onClick={onClick}>
      {content}
    </button>
  );
}

export default FilterButton;
