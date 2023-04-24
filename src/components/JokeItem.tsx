import { IJokes } from '../module/IJoke';
import { FC, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import Loader from './Loader';
import {Grow} from "@material-ui/core";

interface JokeItemProps {
  joke: IJokes;
  deleteJokeHandler: (value: IJokes) => void;
  favoriteJokeHandler: (value: IJokes) => void;
  refreshJokeHandler: (value: IJokes) => void;
  isAlreadyAdded: (value: IJokes) => boolean;
}
const JokeItem: FC<JokeItemProps> = ({
  joke,
  deleteJokeHandler,
  isAlreadyAdded,
  favoriteJokeHandler,
  refreshJokeHandler,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={3} key={joke.id} >
      {isDisabled ? (
        <Loader size="small" loaderColor="secondary" />
      ) : (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          sx={{
            height: '300px'}}
          style={{
            backgroundColor: 'lightblue',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                  <Typography>Type:</Typography>
                  <Typography>
                    <span style={{ color: 'blue', fontWeight: '700' }}>
                      {joke.type}
                    </span>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', color: 'blue' }}>
                  <Typography style={{ fontWeight: '700' }}>ID#</Typography>
                  <Typography style={{ fontWeight: '700' }}>
                    {joke.id}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  flexDirection: 'column',
                }}
                style={{ paddingTop: '15px' }}
              >
                <Typography style={{ fontWeight: '700' }}>Setup</Typography>
                <Typography style={{ textAlign: 'left' }}>
                  {joke.setup}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  flexDirection: 'column',
                }}
                style={{ paddingTop: '15px' }}
              >
                <Typography style={{ fontWeight: '700' }}>Punchline</Typography>
                <Typography style={{ textAlign: 'left' }}>
                  {joke.punchline}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <Grow in={isHovered}>
          <Box
            style={{
              marginTop: 'auto',
              display: 'flex',
              padding: '16px',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteJokeHandler(joke)
              }}
            >
              Delete
            </Button>
            {!isAlreadyAdded(joke) && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => favoriteJokeHandler(joke)}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  disabled={isDisabled}
                  onClick={() => {
                    refreshJokeHandler(joke);
                    setIsDisabled(true);
                  }}
                >
                  Refresh
                </Button>
              </>
            )}
            {isAlreadyAdded(joke) && (
              <>
                <Button variant="contained" disabled>
                  Already added
                </Button>
              </>
            )}
          </Box>
          </Grow>
        </Card>
      )}
    </Grid>
  );
};
export default JokeItem;
