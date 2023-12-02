import React, { useState } from 'react';

interface FilterButtonProps {
  content: string;
  onClick?: () => void;
}

/**
 *
 * @param onClick.content
 * @param onClick function to handle the functionality we want to tie to our filter buttons
 * @param content is the content to be rendered in the button
 * @param root0.onClick
 * @param onClick.onClick
 */
function FilterButton({ content, onClick, ...children }: FilterButtonProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const selectedStyle = 'bg-[#7ca24e]/[0.3]';

  const buttonClass = `py-2 px-4 rounded-2xl whitespace-nowrap border-[0.8px] border-[#386131] border-solid flex-nowrap text-[#386131] ${
    isSelected ? selectedStyle : ''
  }`;

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={handleClick}
      {...children}
    >
      {content}
    </button>
  );
}

export default FilterButton;
