import React from 'react';
import './NewsDisplay.css';
import moment from 'moment';
import { FiExternalLink } from "react-icons/fi";

export default function NewsDisplay(
    {
        title, 
        created_at, 
        content_link,
        id
    }:{
        title: string;
        created_at: string;
        content_link: string;
        id: string;
    }) {
    // format to readable date
    const date = moment(created_at).format("MMMM Do, YYYY");
    return (
        <li key={id}>
            <a href={ content_link }>
                <div className="article">
                    <p id="title"> { title } </p>
                    <p id="date"> { date } </p>
                </div>
            </a>
            <hr></hr>
        </li>
    );
  };