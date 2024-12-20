
import React from 'react';

import { Card, CardHeader, CardContent, CardActionArea } from '@mui/material';
import { Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

interface OptionProps extends React.PropsWithChildren {
    enabled : boolean;
    onChange : () => void,
    avatar : React.ReactNode;
    title : string;
    children : React.ReactNode;
};

const Option : React.FC<OptionProps> =
({enabled, onChange, avatar, title, children}) => {

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
                      <Typography variant="body1">
                          Selected ✅
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
                      <Typography variant="body1">
                          Available 🙋
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
                    >
                    {children}
                    </Typography>
                </CardContent>
            );
        } else {
            return (
                <CardContent sx={{height: '4rem'}}>
                    <Typography
                        variant="body2"
                    >
                    {children}
                    </Typography>
                </CardContent>
            );
        }

    }

    return (
        <Card sx={{ width: '17.5rem' }}>
            <CardActionArea onClick={() => onChange()}>
                <Header
                />
                <Content/>
            </CardActionArea>
        </Card>
    );
};

export default Option;

