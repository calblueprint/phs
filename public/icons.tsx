import React from 'react';

/**
 * @returns Hamburger menu icon fro NavBar component.
 */
export function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
    >
      <path
        d="M9.58331 13.4167H36.4166"
        stroke="white"
        strokeWidth="3.83333"
        strokeLinecap="round"
      />
      <path
        d="M9.58331 23H36.4166"
        stroke="white"
        strokeWidth="3.83333"
        strokeLinecap="round"
      />
      <path
        d="M9.58331 32.5833H36.4166"
        stroke="white"
        strokeWidth="3.83333"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * @returns Back arrow for BackButton component.
 */
export function BackIcon() {
  return (
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
  );
}

/**
 * @returns Right chevron for Carousel.
 */
export function RightChevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1.9rem"
      viewBox="0 0 21 34"
      fill="none"
    >
      <path
        d="M2 2L18 17.2L2 32.4"
        stroke="#FFFDF7"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * @returns External link icon for NewsDisplay.
 */
export function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
    >
      <path
        d="M11 0.5V0H11.5V0.5H11ZM5.47168 6.73591C5.27643 6.93118 4.95985 6.93119 4.76458 6.73594C4.56931 6.54068 4.56929 6.2241 4.76455 6.02883L5.47168 6.73591ZM10.5 5.20589V0.5H11.5V5.20589H10.5ZM11 1H6.29449V0H11V1ZM11.3536 0.853539L5.47168 6.73591L4.76455 6.02883L10.6464 0.146461L11.3536 0.853539Z"
        fill="#808080"
      />
      <path
        d="M10.4111 7.55886V7.55886C10.4111 8.32518 10.4111 8.70834 10.3131 9.01919C10.1054 9.67812 9.58921 10.1943 8.93028 10.402C8.61943 10.5 8.23627 10.5 7.46995 10.5H5.23541C3.23887 10.5 2.24061 10.5 1.62036 9.8798C1.00012 9.25955 1.00012 8.26129 1.00012 6.26475V4.0292C1.00012 3.26311 1.00012 2.88006 1.09807 2.56929C1.30582 1.91021 1.82207 1.39396 2.48115 1.18621C2.79192 1.08826 3.17497 1.08826 3.94106 1.08826V1.08826"
        stroke="#808080"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * @returns Close icon for DisplayPreviewCard.
 */
export function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M10.0523 11.0274L3.35083 4.32596M10.0524 4.32596L3.35083 11.0275"
        stroke="#272929"
        strokeWidth="1.11692"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @param color color of marker, passed as hex rgb.
 * @param color.color color of marker, passed as hex rgb.
 * @returns Marker icon for SiteMap.
 */
export function DefaultMarkerIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g filter="url(#filter0_d_5161_2353)">
        <circle cx="10" cy="10" r="9" fill={color} />
        <circle cx="10" cy="10" r="8.1" stroke="#FFFDF7" strokeWidth="1.8" />
      </g>
      <defs>
        <filter
          id="filter0_d_5161_2353"
          x="0"
          y="0"
          width="20"
          height="20"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5161_2353"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5161_2353"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

/**
 *
 * @param root0 color of marker, passed as hex rgb.
 * @param root0.color color of marker, passed as hex rgb.
 * @returns Marker icon for SiteMap when seelcted.
 */
export function SelectedMarkerIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
    >
      <g filter="url(#filter0_d_5531_6851)">
        <circle cx="20.5" cy="20" r="18" fill={color} />
        <circle
          cx="20.5"
          cy="20"
          r="16.3"
          stroke={color}
          strokeWidth="3.4"
        />
      </g>
      <circle cx="20.5" cy="20" r="6" fill="#FFFDF7" />
      <defs>
        <filter
          id="filter0_d_5531_6851"
          x="0.5"
          y="0"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5531_6851"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5531_6851"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
