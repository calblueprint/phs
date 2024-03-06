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
    const date = moment(created_at).format("MMMM Do, YYYY");
    return (
        <li key={id}>
            <a href={ content_link }>
                <div className="article">
                    <div id="title-line">
                        <span id="title"> { title } </span>
                        <div id="icon"> <FiExternalLink color="#3B3B3B"/> </div>
                    </div>
                    <p id="date"> { date } </p>
                </div>
            </a>
            <hr></hr>
        </li>
    );
  };