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
              <FiExternalLink />
            </div>
          </div>
          <p className="text-shadow not-italic font-light leading-[normal] uppercase text-xs">
            {' '}
            {date}{' '}
          </p>
        </div>
      </a>
      <hr className="border-silver m-auto h-[.5px] mb-[10px]" />
    </li>
  );
}
