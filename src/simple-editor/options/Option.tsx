
import { Card, CardHeader, CardContent, CardActionArea } from '@mui/material';
import { Typography } from '@mui/material';
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
                      <Typography variant="body1">
                          Active ✅
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

