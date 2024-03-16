import React from 'react';
import moment from 'moment';
import { FiExternalLink } from "react-icons/fi";

/**
 *
 * @param root0 idk
 * @param root0.title title of news article
 * @param root0.id id of article
 * @param root0.createdAt time article added
 * @param root0.contentLink link to article
 * @returns Single Newsdisplay
 */
export default function NewsDisplay(
    {
        title, 
        createdAt, 
        contentLink,
        id
    }:{
        title: string;
        createdAt: string;
        contentLink: string;
        id: string;
    }) {
    // format to readable date
    const date = moment(createdAt).format("MMMM Do, YYYY");
    return (
        <li key={id}>
            <a href={ contentLink }>
                <div className="w-[95%] m-auto flex flex-col items-start gap-[12px] mb-[24px] mt-[24px] font-[Lato]">
                    <div className="flex m-auto flex-row justify-between w-full"> 
                        <p className="text-night text-[16px] not-italic font-medium leading-[normal] w-[90%]"> { title } </p>
                        <div className="mt-[1px]"> 
                            <FiExternalLink/>
                        </div>
                    </div>
                    <p className="text-shadow not-italic font-light leading-[normal] uppercase text-xs"> { date } </p>
                </div>
            </a>
            <hr className="border-silver w-[95%] m-auto h-[.5px] mb-[10px]"/>
        </li>
    );
  };