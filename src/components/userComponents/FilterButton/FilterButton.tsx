import React, { useState } from 'react';

interface FilterButtonProps {
  content: string;
  onClick?: () => void;
}

function FilterButton({ content, ...children }: FilterButtonProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const defaultStyle = 'bg-[#4b711d]/[0.13] text-[#4B711D] border-[#547829]';
  const selectedStyle = 'bg-[#547829] text-white border-[#547829]';

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      type="button"
      className={`${
        isSelected ? selectedStyle : defaultStyle
      } py-2 px-4 rounded-full whitespace-nowrap border border-solid flex-nowrap`}
      onClick={handleClick}
      {...children}
    >
      {content}
    </button>
  );
}

export default FilterButton;
