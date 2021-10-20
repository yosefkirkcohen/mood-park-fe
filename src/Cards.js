import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, CssBaseline } from '@mui/material';
//import { Button } from '@mui/material';

const parks = [
    {
        name: 'Yellowstone',
        description: `This place is awesome.  It lets you stand and look at things, and you can 
        walk around and throw things IN the trash can.`,
        img: 'https://placekitten.com/300/300',
        park_code: 'abli',
        favorite: false
    },
    {
        name: 'Grand Tetons',
        description: `The big mountains, all the grass.  Wow.  Bring your momma to this place.`,
        img: 'https://placekitten.com/200/200',
        park_code: 'bert',
        favorite: false
    },
    {
        name: 'Jellystone',
        description: `Watch out for the bears, and if they talk to you, run and hide.`,
        img: 'https://placekitten.com/400/400',
        park_code: 'crab',
        favorite: false
    },
    {
        name: 'East Coast Park',
        description: `If you can do it anywhere, you can do it here.  This park is for the goombah's and the tough kids.`,
        img: 'https://placekitten.com/250/250',
        park_code: 'ater',
        favorite: false
    },
    {
        name: 'Blah blah blah',
        description: `This park is the last one on the list.  Come here and your done,  No more.  No more need to go anywhere else...`,
        img: 'https://placekitten.com/200/200',
        park_code: 'guyi',
        favorite: false
    }
    
]

export default function RecipeReviewCard() {

  return (
      <>
<CssBaseline />

<Grid
  container 
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
> 
{parks.map(park => 

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={park.img}
          alt={park.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {park.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {park.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="large" color="primary"> */}
         {/* Favorite */}
          <IconButton size='large' color = "error" aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* </Button> */}
      </CardActions>
    </Card>

)}
    </Grid>
    </>
  );
}
