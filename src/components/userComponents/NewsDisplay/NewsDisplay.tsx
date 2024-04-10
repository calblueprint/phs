import React from 'react';
import moment from 'moment';
import { FiExternalLink } from 'react-icons/fi';

/**
 *
 * @param root0 idk
 * @param root0.title title of news article
 * @param root0.id id of article
 * @param root0.createdAt time article added
 * @param root0.contentLink link to article
 * @returns A Single News Display Component
 */
export default function NewsDisplay({
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
  // format to readable date
  const date = moment(createdAt).format('MMMM Do, YYYY');
  return (
    <li key={id}>
      <a href={contentLink} target="_blank" rel="noreferrer noopener">
        <div className="flex flex-col items-start gap-3 mb-6 mt-6 font-[Lato]">
          <div className="flex m-auto flex-row justify-between w-full">
            <p className="text-night text-[16px] not-italic font-medium leading-[normal] w-[90%]">
              {' '}
              {title}{' '}
            </p>
            <div className="mt-[1px]">
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
            </div>
          </div>
          <p className="text-shadow leading-[normal] text-xs font-normal font-[Lato] uppercase">
            {date}
          </p>
        </div>
      </a>
      <hr className="border-silver m-auto h-[.5px] mb-[10px]" />
    </li>
  );
}
