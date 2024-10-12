
import React from 'react';

import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { Typography, ToggleButton } from '@mui/material';
import { Check, } from '@mui/icons-material';

const Option = ({enabled, onChange, avatar, title, content} : {
    enabled : boolean;
    onChange : () => void,
    avatar : any;
    title : string;
    content : any;
}) => {
    return (
        <Card sx={{ width: '16rem' }}>
            <CardHeader
              avatar={avatar}
              title={title}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{ fontSize: 12 }}
                >
                {content}
                </Typography>
            </CardContent>
            <CardActions>
                <ToggleButton
                    value="check"
                    selected={enabled}
                    color="primary"
                    onChange={() => onChange()}
                >
                    <Check/>
                </ToggleButton>
            </CardActions>
        </Card>
    );
};

export default Option;

