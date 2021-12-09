import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './CardTeam.css'



export default function CardTeam(team) {
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="120"
                    image={"https://www.sciencekids.co.nz/images/pictures/flags680/"+team['team']+".jpg"}
                    alt={team}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {team['team']}
                    </Typography>
                </CardContent>
            </CardActionArea>
                <CardActions justify="center">
                        <Button  size="large" color="primary">
                            SELECT
                        </Button>
                </CardActions>
        </Card>
    );
}
