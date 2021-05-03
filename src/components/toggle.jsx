import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Toggle(props) {

    return(
        <FormControlLabel
            control={
                <Switch
                    checked={props.checked}
                    onChange={props.onChange}
                    name={props.name}
                    color="primary"
                />
            }
            label={props.label}
        />
    );
}