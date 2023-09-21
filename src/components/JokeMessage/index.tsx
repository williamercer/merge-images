import React, { useState, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Button from 'components/Button';

import { Joke } from 'store/slices/jokeSlice';

import QuoteLeft from 'assets/icons/quoteLeft.svg';
import QuoteRight from 'assets/icons/quoteRight.svg';

const JokeBlock = styled(Stack)({
  background: `url(${QuoteLeft}) no-repeat;`,
  backgroundSize: '80px 80px',
  padding: 40,
  animation: '1s ease-out 0s 1 slideInFromLeft',
});

const PunchlineBlock = styled(Stack)({
  alignItems: 'end',
  background: `url(${QuoteRight}) bottom right no-repeat`,
  backgroundSize: '80px 80px',
  padding: 40,
  animation: '1s ease-out 0s 1 slideInFromRight',
});

const AnimationButton = styled(Button)({
  animation: '1s ease-out 0s 1 fadeIn',
});

interface IJokeProps {
  data?: Joke;
}

const JokeMessage: React.FC<IJokeProps> = ({ data }) => {
  const [showPunchline, setShowPunchline] = useState<boolean>(false);

  const togglePunchlineVisibile = useCallback(() => {
    setShowPunchline((show) => !show);
  }, []);

  if (data) {
    return (
      <Stack direction="column" width="100%" gap={5}>
        <JokeBlock>
          <Typography variant="jokemessage">{data.setup}</Typography>
        </JokeBlock>

        <Stack direction="row" justifyContent="center">
          <AnimationButton
            color="secondary"
            disableElevation
            disableRipple
            variant="contained"
            onClick={togglePunchlineVisibile}
          >
            {showPunchline ? 'Hide Punchline' : 'Show Punchline'}
          </AnimationButton>
        </Stack>

        {showPunchline && (
          <PunchlineBlock>
            <Typography variant="jokemessage">{data.punchline}</Typography>
          </PunchlineBlock>
        )}
      </Stack>
    );
  }

  return (
    <Typography sx={{ color: 'text.warning' }} fontWeight="bold">
      THERE WAS AN ERROR LOADING YOUR JOKE
    </Typography>
  );
};

JokeMessage.defaultProps = {
  data: undefined,
};

export default JokeMessage;
