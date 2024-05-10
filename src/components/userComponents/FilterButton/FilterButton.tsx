import React from 'react';
import React from 'react';

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
 * @param root0
 * @param root0.content
 * @param root0.onClick
 * @param root0.isSelected
 */
function FilterButton({ content, onClick, isSelected }: FilterButtonProps) {
  const selectedStyle = 'bg-hunterGreen text-white font-lato text-base font-normal rounded-lg w-auto';
  

  const buttonClass = `py-2.5 px-6 whitespace-nowrap text-scary-forest flex-grow font-lato text-base font-normal  ${
    isSelected ? selectedStyle : ''
  }`;

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      style={{ outline: 'none' }}
    >
      {content}
    </button>
  );
}

export default FilterButton;
