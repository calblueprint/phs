import React, { useEffect, useState } from 'react';

import { LinksRow } from '../../../types/types';

import fetchAllLinks from '../../../supabase/links/queries';
import { ExternalLinkIcon } from '../../../../public/icons';

/**
 * @returns the Related Links component
 */
export default function RelatedLinks() {
  const [links, setLinks] = useState<LinksRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedLinks = await fetchAllLinks();
      setLinks(fetchedLinks);
    };
    fetchData();
  }, []);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white-smoke border-y-silver border-y-[0.5px] px-[1.12rem] py-8">
      <div className="flex flex-col gap-6">
        <h4 className="text-night">Related Links</h4>
        <ul className="flex flex-col gap-6 px-[0.875rem]">
          {links.map(link => (
            <li
              key={link.id}
              className="flex flex-col gap-1 border-b-silver border-b-[0.5px] pb-4"
            >
              <div className="flex flex-row gap-2 items-center">
                <a
                  href={link.url || '#'}
                  target={link.url ? '_blank' : '_self'}
                  rel={link.url ? 'noopener noreferrer' : undefined}
                  className="s1 text-shadow uppercase truncate"
                >
                  {link.type}
                </a>
                <ExternalLinkIcon />
              </div>
              <a
                href={link.url || '#'}
                target={link.url ? '_blank' : '_self'}
                rel={link.url ? 'noopener noreferrer' : undefined}
                className="b2 text-night line-clamp-2"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
