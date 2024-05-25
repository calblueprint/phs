import React from 'react';

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
 * @param props - props for the FilterButton component
 * @param props.content - content of the button
 * @param props.onClick - function to handle the functionality we want to tie to our filter buttons
 * @param props.isSelected - boolean to determine if the button is selected
 * @returns JSX.Element
 */
function FilterButton({ content, onClick, isSelected }: FilterButtonProps) {
  const baseStyle =
    'py-2.5 px-3 whitespace-nowrap font-lato text-base font-normal rounded-lg flex-grow text-center';
  const selectedStyle = 'bg-hunter-green text-white';
  const unselectedStyle = 'bg-mint-cream text-scary-forest';

  const buttonClass = `${baseStyle} ${
    isSelected ? selectedStyle : unselectedStyle
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
