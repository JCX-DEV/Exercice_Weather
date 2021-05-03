import React from 'react';
import Icons from '../assets/icons.svg';

export default function RowInfo(props) {
    return (
        <div>
            <svg width="16px" height="16px" fill={props.color}>
                <use xlinkHref={`${Icons}#${props.id}`}/>
            </svg>
            <span style={{marginLeft: '5px'}}>
                {props.message}
            </span>
        </div>
    )
}