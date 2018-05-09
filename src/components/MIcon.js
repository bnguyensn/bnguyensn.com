// @flow
'use strict';

import React from 'react';

import './micon.css';

/** ********** GOOGLE'S MATERIAL ICON ********** **/

export function MIcon(props: {icon: string}) {
    return (
        <span className='micon-container'>
            <i className='material-icons'>{props.icon}</i>
        </span>
    )
}

/** ********** SVG MATERIAL ICON ********** **/

export function MIconSVG(props: {svgSize?: string, svgD: string | string[], svgFill: string}) {
    const size = props.svgSize ? props.svgSize : 'medium';
    let pathElement;
    if (Array.isArray(props.svgD)) {
        pathElement = props.svgD.map((d) =>
            <path key={d.slice(5)} d={d} fill={props.svgFill} />
        );
    } else {
        pathElement = <path d={props.svgD} fill={props.svgFill} />;
    }

    return (
        <span className='micon-container'>
            <svg className={size} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {pathElement}
            </svg>
        </span>
    )
}

export function MIconSVGLink(props: {extraClsNme: string, href: string, svgD: string, svgFill: string}) {
    return (
        <a className={props.extraClsNme} href={props.href} target='_blank'>
            <MIconSVG svgD={props.svgD} svgFill={props.svgFill} />
        </a>
    )
}