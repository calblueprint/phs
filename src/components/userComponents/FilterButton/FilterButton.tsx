import React from 'react';

interface FilterButtonProps {
  content: string;
  onClick: () => void;
  isSelected: boolean; // Added isSelected prop
}

/**
 *
 */
function FilterButton({ content, onClick, isSelected }: FilterButtonProps) {
  const baseStyle = 'py-2.5 px-3 whitespace-nowrap font-lato text-base font-normal rounded-lg flex-grow text-center';
  const selectedStyle = 'bg-hunter-green text-white';
  const unselectedStyle = 'bg-mint-cream text-scary-forest';

  const buttonClass = `${baseStyle} ${isSelected ? selectedStyle : unselectedStyle}`;

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
