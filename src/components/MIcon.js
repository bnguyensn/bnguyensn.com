// @flow
'use strict';

import React from 'react';

import './micon.css';

/** GOOGLE'S MATERIAL ICON **/

export function MIcon(props: {icon: string}) {
    return (
        <span className='micon-container'>
            <i className='material-icons'>{props.icon}</i>
        </span>
    )
}

/** SVG MATERIAL ICON **/

export function MIconSVG(props: {svgSize?: string, svgD: string, svgFill: string}) {
    const size = props.svgSize ? props.svgSize : 'medium';
    return (
        <span className='micon-container'>
            <svg className={size} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d={props.svgD} fill={props.svgFill} />
            </svg>
        </span>
    )
}

export function MIconSVGLink(props: {href: string, svgD: string, svgFill: string}) {
    return (
        <a href={props.href} target='_blank'>
            <MIconSVG svgD={props.svgD} svgFill={props.svgFill} />
        </a>
    )
}