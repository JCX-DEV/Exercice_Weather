import React from 'react';
import AvatarInfo from './avatarInfo';
import RowInfo from './rowInfo';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 400,
      height: 200,
      margin: 10,
      display: 'inline-block',
    },
    content:{
        display: 'inline-block',
        marginLeft: 10,
    },
    media:{
        display: 'table-cell',
        height: 100,
        width: 100,
    },
    header:{
        display: 'table',
        width: 400,
    },
    title: {
        display: 'table-cell',
        verticalAlign: 'middle',
    },
    infoTable: {
        display: 'table',
        width: 400,
    },
    infoRow: {
        display: 'table-row',
    },
    infoCell: {
        display: 'table-cell',
        textAlign: 'left',
    }    
}));

export default function WeatherCard(props){
    const classes = useStyles();
    
    let renderInfo = (id, message) => {
        return (
            message && <li className={classes.infoCell}>
                <RowInfo id={id} message={message} color={props.themeColor} />
            </li>
        )
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <div className={classes.header} >
                    <CardMedia 
                        image={props.src}
                        className={classes.media}
                    />
                    <div className={classes.title}>
                        <Typography variant="h6" component="h6">
                            {props.date}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {props.description}
                        </Typography>                                
                    </div>
                    <div className={classes.title}>
                        <AvatarInfo 
                            id="UMBRELLA" 
                            legend={props.pop} 
                            width={50} 
                            color={props.themeColor}
                            fontColor={props.themeFont}
                        />
                    </div>
                </div>
                <div  className={classes.infoTable}>
                    <ul className={classes.infoRow}>
                        {renderInfo("TEMPERATURE", props.temp)}
                        {renderInfo("CLOUDS", props.clouds)}
                    </ul>
                    <ul className={classes.infoRow}>
                        {renderInfo("WIND", props.wind)}
                        {renderInfo("HUMIDITY", props.humidity)}                      
                    </ul>
                    <ul className={classes.infoRow}>
                        {renderInfo("RAIN", props.rain)}
                        {renderInfo("SNOW", props.snow)}                  
                    </ul>                                                                                            
                </div>
            </CardContent>
        </Card>
    );
}