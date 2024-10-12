
import React from 'react';

import {
    Card, CardHeader, CardContent, CardActions, CardActionArea
} from '@mui/material';
import { Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Check, } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const Option = ({enabled, onChange, avatar, title, content} : {
    enabled : boolean;
    onChange : () => void,
    avatar : any;
    title : string;
    content : any;
}) => {

    const Header = () => {

        if (enabled) {
            return (
                <CardHeader
                  sx={{
                      backgroundColor: blue[200]
                  }}
                  avatar={avatar}
                  title={title}
                  subheader={
                      <Typography variant="body">
                          active
                      </Typography>
                  }
                />
            );
        } else {
            return (
                <CardHeader
                  avatar={avatar}
                  title={title}
                  subheader={
                      <Typography variant="body">
                          available
                      </Typography>
                  }
                />
            );
        }

    }

    const Content = () => {

        if (enabled) {
            return (
                <CardContent sx={{
                    height: '4rem', backgroundColor: blue[200]
                }}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: 12 }}
                    >
                    {content}
                    </Typography>
                </CardContent>
            );
        } else {
            return (
                <CardContent sx={{height: '4rem'}}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: 12 }}
                    >
                    {content}
                    </Typography>
                </CardContent>
            );
        }

    }

    return (
        <Card sx={{ width: '16rem' }}>
            <CardActionArea onClick={() => onChange()}>
                <Header
                  sx={{ backgroundColor: "primary.dark", color: "primary.contrastText" }}
                  avatar={avatar}
                  title={title}
                />
                <Content/>
            </CardActionArea>
        </Card>
    );
};

export default Option;

