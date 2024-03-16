import React from 'react';

/**
 *
 * @param root0
 * @param root0.title
 * @param root0.createdAt
 * @param root0.contentLink
 * @param root0.id
 * @returns exhibit component
 */
export default function Exhibit({
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
    return (
      <li key={id} />
    );
  }