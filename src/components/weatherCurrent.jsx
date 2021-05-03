import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import RowInfo from './rowInfo';
import { makeStyles } from '@material-ui/core/styles';
import Icons from '../assets/icons.svg';
import image200 from '../assets/200.jpg';
import image300 from '../assets/300.jpg';
import image500 from '../assets/500.jpg';
import image600 from '../assets/600.jpg';
import image700 from '../assets/700.jpg';
import image800 from '../assets/800.jpg';
import image900 from '../assets/900.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 600,
      height: 150,
      margin: '30px 10px 10px 10px',
      display: 'inline-block',
    },
    content:{
        marginLeft: 10,
    },
    media:{
        display: 'table-cell',
        width: 200,
        height: 150,        
    },
    titleGroup:{
        display: 'inline-block',
        width: 380,
    },
    title:{
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginLeft: 5,
    },
    timestamp: {
        float: 'right',
    },
    main: {
        display: 'table-cell',
        width: 400,
        height: 150,
        textAlign: 'left',
    },
    infoTable: {
        display: 'table',
        width: 380,
    },
    infoRow: {
        display: 'table-row',
    },
    infoCell: {
        display: 'table-cell',
    }
}));

export default function WeatherCurrent(props){
    const classes = useStyles();
    
    let categoryImages = [
        null,
        null,
        image200,
        image300,
        null,
        image500,
        image600,
        image700,
        image800,
        image900
    ];

    let renderInfo = (id, message) => {
        return (
            message && <li className={classes.infoCell}>
                <RowInfo id={id} message={message} color={props.color} />
            </li>
        )
    }

    return (
        <Card className={classes.root}>
            <CardMedia 
                image={categoryImages[props.category]}
                className={classes.media}
            />
            <div className={classes.main}>
                <CardContent className={classes.content}>
                    <div className={classes.titleGroup}>
                        <svg width="20px" height="20px" fill={props.color}>
                            <use xlinkHref={`${Icons}#MAP`}/>
                        </svg>
                        <span className={classes.title}>
                            {props.location}
                        </span>
                        <Typography variant="subtitle1" color="textSecondary" className={classes.timestamp}>
                            {props.date}
                        </Typography>
                    </div>
                    <Typography variant="h6" color="textPrimary">
                        {props.description}
                    </Typography>                    
                    <div  className={classes.infoTable}>
                        <ul className={classes.infoRow}>
                            {renderInfo("TEMPERATURE", props.temp)}
                        </ul>
                        <ul className={classes.infoRow}>
                            {renderInfo("CLOUDS", props.clouds)}
                            {renderInfo("WIND", props.wind)}
                            {renderInfo("HUMIDITY", props.humidity)}
                        </ul>
                        <ul className={classes.infoRow}>
                            {renderInfo("RAIN", props.rain)}
                            {renderInfo("SNOW", props.snow)}
                        </ul>                                                                        
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}