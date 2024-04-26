import React from 'react';

/**
 * @returns Hamburger menu icon for NavBar component.
 */
export function HamburgerMenu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M20.0007 28.3332L31.6673 28.3332M8.33398 19.9998H31.6673M8.33398 11.6665H31.6673"
        stroke="#FFFDF7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @returns the CloseMenu icon
 */
export function CloseMenu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M21.8754 21.8749L3.12549 3.125M21.8755 3.125L3.12549 21.8751"
        stroke="#FFFDF7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @param root0 -
 * @param root0.strokeColor - The color of the arrow
 * @returns the BackArrow icon
 */
export function BackArrow({ strokeColor = '#386131' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M15.75 9H2.25M2.25 9L6 12.75M2.25 9L6 5.25"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @returns the NextArrow icon
 */
export function NextArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M2.25 9H15.75M15.75 9L12 5.25M15.75 9L12 12.75"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @returns the Caret Left icon
 */
export function CaretLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="23"
      viewBox="0 0 15 23"
      fill="none"
    >
      <path
        d="M13 2L3 11.5L13 21"
        stroke="#386131"
        strokeOpacity="0.17"
        strokeWidth="3.16667"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * @returns the Caret Right icon
 */
export function CaretRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="23"
      viewBox="0 0 15 23"
      fill="none"
    >
      <path
        d="M2 2L12 11.5L2 21"
        stroke="#D7E1CE"
        strokeOpacity="0.22"
        strokeWidth="3.16667"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * @returns the Congratulations icon
 */
export function Congratulations() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="38"
      viewBox="0 0 74 38"
      fill="none"
    >
      <path
        d="M16.8928 32.3137L5.5791 21"
        stroke="url(#paint0_linear_3790_3714)"
        strokeWidth="9.87583"
        strokeLinecap="round"
      />
      <path
        d="M36.5791 21V5"
        stroke="url(#paint1_linear_3790_3714)"
        strokeWidth="9.87583"
        strokeLinecap="round"
      />
      <path
        d="M57.1072 32.3301L68.4209 21.0164"
        stroke="url(#paint2_linear_3790_3714)"
        strokeWidth="9.87583"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3790_3714"
          x1="5.93265"
          y1="20.6464"
          x2="17.2464"
          y2="31.9602"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7CA24E" />
          <stop offset="1" stopColor="#7CA24E" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3790_3714"
          x1="37.0791"
          y1="5"
          x2="37.0791"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7CA24E" />
          <stop offset="1" stopColor="#7CA24E" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3790_3714"
          x1="68.7745"
          y1="21.3699"
          x2="57.4607"
          y2="32.6836"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7CA24E" />
          <stop offset="1" stopColor="#7CA24E" stopOpacity="0.45" />
        </linearGradient>
      </defs>
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
        <circle cx="20.5" cy="20" r="16.3" stroke={color} strokeWidth="3.4" />
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
