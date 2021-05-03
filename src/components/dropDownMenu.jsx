import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      maxWidth: 150,
      display: 'inline-block',
      margin: '0 10px',
    },
    select: {
        width: 150,
    }
}));

export default function DropDownMenu(props){
    const classes = useStyles();
    
    return(
        <FormControl className={classes.formControl}>
            <InputLabel id={`${props.id}-label`}>
                {props.inputLabel}
            </InputLabel>
            <Select
                labelId={`${props.id}-label`}
                id={`${props.id}-select`}
                value={props.value ? props.value : ""}
                onChange={props.onChange}
                className={classes.select}
            >
                {
                    props.menu && props.menu.map(
                        item => (
                            <MenuItem key={item.id} value={item.value}>
                                {item.label}
                            </MenuItem>
                        )
                    )
                }
            </Select> 
        </FormControl>  
    )
}