import React, { useState } from 'react';
import { Box, Button, Slider, Typography, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';

interface GameResult {
  time: string;
  guess: string;
  result: number;
  win: boolean;
}

const DiceGame: React.FC = () => {
  const [threshold, setThreshold] = useState(50);
  const [guessType, setGuessType] = useState<'under' | 'over'>('under');
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<GameResult[]>([]);
  const [status, setStatus] = useState<'win' | 'lose' | null>(null);

  const handlePlay = () => {
    const roll = Math.floor(Math.random() * 100) + 1;
    const win = guessType === 'under' ? roll < threshold : roll > threshold;

    const now = new Date().toLocaleTimeString();
    const guessText = `${guessType === 'under' ? 'Under' : 'Over'} ${threshold}`;

    const newResult: GameResult = {
      time: now,
      guess: guessText,
      result: roll,
      win,
    };

    setResult(roll);
    setStatus(win ? 'win' : 'lose');
    setHistory((prev) => [newResult, ...prev.slice(0, 9)]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 4 }}>
      {status === 'win' && <Alert severity="success">You won</Alert>}
      {status === 'lose' && <Alert severity="error">You lost<br />{guessType === 'under' ? 'Number was higher' : 'Number was lower'}</Alert>}

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="h2">{result ?? '--'}</Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <RadioGroup
          row
          value={guessType}
          onChange={(e) => setGuessType(e.target.value as 'under' | 'over')}
        >
          <FormControlLabel value="under" control={<Radio />} label="Under" />
          <FormControlLabel value="over" control={<Radio />} label="Over" />
        </RadioGroup>
        <Slider
          value={threshold}
          onChange={(_, newValue) => setThreshold(newValue as number)}
          min={1}
          max={99}
          valueLabelDisplay="auto"
        />
        <Button variant="contained" fullWidth onClick={handlePlay}>PLAY</Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Game History</Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          {history.map((entry, idx) => (
            <li key={idx}>
              <Typography variant="body2">
                {entry.time} — {entry.guess} — {entry.result} — {entry.win ? '✅ Win' : '❌ Loss'}
              </Typography>
            </li>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DiceGame;
