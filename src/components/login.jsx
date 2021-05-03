import React, { useState, Fragment } from 'react';
import Background from '../assets/background.jpg';
import LogoWhite from '../assets/logo-white.png';
import Icons from '../assets/icons.svg';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input: {
        width: 500,
        backgroundColor: 'white',
    }
}));

export default function Login(props) {
    const classes = useStyles();
    const [key, setKey] = useState("");

    let handleChange = (event) => {
        setKey(event.target.value)        
    }

    let handleClick = (event) => {
        event.preventDefault();
        if (props.onSubmit) {
            props.onSubmit(key);
        }
    }
    
    return(
        <Fragment>
            <div style={
                {
                    width: '100vw',
                    height: '100vh',
                    filter: 'blur(8px)',
                    background: `url(${Background}) no-repeat center center fixed`,
                    backgroundSize: 'cover',
                } 
            }/>
            <div style={
                {
                    position: 'absolute',
                    top: 'calc(50vh - 205px)',
                    left: 'calc(50vw - 360px)',
                    width: '720px',
                    height: '410px',                    
                    textAlign: 'center',
                }
            }
            >
                <img src={LogoWhite} alt="logo" style={{width: '40%'}} />
                <div style={{color: "white", fontSize: '1.2rem', margin: '10px 0'}}>
                    <svg width="20px" height="20px" fill="white" style={{marginRight: '10px'}}>
                            <use xlinkHref={`${Icons}#KEY`}/>
                    </svg>
                    {props.formTitle}
                </div>
                <div style={{margin: '10px 0'}}>
                    <TextField 
                        id="input-key" 
                        label={props.label}
                        placeholder={props.placeholder}
                        value={key}
                        onChange={handleChange}
                        variant="outlined"
                        className={classes.input} 
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={handleClick} disabled={(!key)}>
                        {props.submitCaption}
                    </Button>                    
                </div>
            </div>
        </Fragment>
    );
} 