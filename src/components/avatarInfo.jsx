import React from 'react';
import Icons from '../assets/icons.svg';

export default function AvatarInfo(props){
    // setting sizes from props
    let currentWidth = props.width ? props.width : 100;
    let pad = 5;
    let iconSize = Math.floor(currentWidth/2) + pad;
    let fontPx = currentWidth * 0.24;

    // setting colors from props
    let isHexColor = (color) => (color ? color.match(/^#([0-9a-fA-F]{6})$/g) : false);
    let bkgColor = (props.color && isHexColor(props.color)) ? props.color : '#CCCCCC';    
        
    let [red, green, blue] = bkgColor.match(/([0-9a-fA-F]{2})/g).map(c => parseInt(c, 16));  
    let contrastColor = ((0.2125*red)+(0.7154*green)+(0.0721*blue) < 30 ? "#ffffff" : "#000000");
    let fontColor = (props.fontColor && isHexColor(props.fontColor) ? props.fontColor : contrastColor);

    return (
        <div style={
            {
                display: 'inline-block',
                borderRadius: '100%',
                backgroundColor: `${bkgColor}`,
                textAlign: 'center',
                verticalAlign: 'middle',
                padding: `${pad}px`,
                margin: `0 10px`,
                width: `${currentWidth}px`,
                height: `${currentWidth}px`,
            }
        }>
            <svg width={`${iconSize}px`} height={`${iconSize}px`} fill={fontColor}>
                <use xlinkHref={`${Icons}#${props.id}`}/>
            </svg>
            <div style={{color: `${fontColor}`, fontWeight: 'bold', fontSize: `${fontPx}px`}}>
                {props.legend}
            </div>
        </div>
    );
}