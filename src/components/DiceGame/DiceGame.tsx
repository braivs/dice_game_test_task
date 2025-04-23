import React, {useState} from 'react'
import {
  Box,
  Button,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@mui/material'
import styles from './DiceGame.module.scss'

type GameResult = {
  time: string
  guess: string
  result: number
  win: boolean
}

const DiceGame: React.FC = () => {
  const [threshold, setThreshold] = useState(50)
  const [guessType, setGuessType] = useState<'under' | 'over'>('under')
  const [result, setResult] = useState<number | null>(null)
  const [history, setHistory] = useState<GameResult[]>([])
  const [status, setStatus] = useState<'win' | 'lose' | null>(null)

  const handlePlay = () => {
    const roll = Math.floor(Math.random() * 100) + 1
    const win = guessType === 'under' ? roll < threshold : roll > threshold

    const now = new Date().toLocaleTimeString()
    const guessText = `${guessType === 'under' ? 'Under' : 'Over'} ${threshold}`

    const newResult: GameResult = {
      time: now,
      guess: guessText,
      result: roll,
      win,
    }

    setResult(roll)
    setStatus(win ? 'win' : 'lose')
    setHistory((prev) => [newResult, ...prev.slice(0, 9)])
  }

  const marks = [
    { value: 0, label: '0' },
    { value: 20, label: '' },
    { value: 40, label: '' },
    { value: 60, label: '' },
    { value: 80, label: '' },
    { value: 100, label: '100' },
  ]

  return (
    <Box className={styles.diceGame}>
      <Box>
        {status === 'win' && <Alert severity="success" variant={'filled'} className={styles.alert}>You won</Alert>}
        {status === 'lose' &&
            <Alert severity="error" className={styles.alert} variant={'filled'}>You
                lost<br/>{guessType === 'under' ? 'Number was higher' : 'Number was lower'}
            </Alert>}
      </Box>


      <Box className={styles.resultBox}>
        <h1> {result ?? '--'}</h1>
      </Box>

      <RadioGroup
        row
        value={guessType}
        onChange={(e) => setGuessType(e.target.value as 'under' | 'over')}
        className={styles.radioGroup}
      >
        <FormControlLabel value="under" control={<Radio/>} label="Under" labelPlacement={'start'}/>
        <FormControlLabel value="over" control={<Radio/>} label="Over" labelPlacement={'start'}/>
      </RadioGroup>
      <Slider
        value={threshold}
        onChange={(_, newValue) => setThreshold(newValue as number)}
        min={0}
        max={100}
        valueLabelDisplay="auto"
        className={styles.slider}
        marks={marks}
      />
      <Button variant="contained" fullWidth onClick={handlePlay} className={styles.button}>PLAY</Button>

      <Table className={styles.historyTable}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHead}>Time</TableCell>
            <TableCell className={styles.tableHead}>Guess</TableCell>
            <TableCell className={styles.tableHead}>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((entry, idx) => (
            <TableRow key={idx}>
              <TableCell>{entry.time}</TableCell>
              <TableCell>{entry.guess}</TableCell>
              <TableCell className={entry.win ? styles.win : styles.lose}>{entry.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default DiceGame
