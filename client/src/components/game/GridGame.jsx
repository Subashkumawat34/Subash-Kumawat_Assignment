import React, { useReducer, useEffect, useState } from 'react';
import { generatePattern1, generatePattern2, getRedPattern1, getRedPattern2 } from '../../game/patterns';
import { handleTileClick } from '../../game/handleTileClick';
import { countTilesByType } from '../../game/gridUtils';
import { useGameLoop } from '../../hooks/useGameLoop';
import { scoreService } from '../../services/api';

import Grid from './Grid';
import HUD from './HUD';
import GridControls from './GridControls';
import GameModal from './GameModal';

import './GridGame.css';

const initialState = {
  status: 'IDLE', // IDLE, PLAYING, WON_PATTERN_1, TRANSITION, WON_GAME, LOSE
  currentPattern: 1,
  rows: 30,
  cols: 10,
  grid: [],
  baseGrid: [],
  score: 0,
  lives: 5,
  timeLeft: 30,
  totalBlue: 0,
  playerName: '',
  loseReason: '',
  tickCount: 0 // Used for animating Pattern 1 continuously
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    case 'INIT_GAME':
      const isPattern2 = action.payload.pattern === 2;
      const r = action.payload.rows || state.rows;
      const c = action.payload.cols || state.cols;
      const newGrid = isPattern2 
        ? generatePattern2(r, c)
        : generatePattern1(r, c); 
        
      return {
        ...state,
        status: 'PLAYING',
        currentPattern: action.payload.pattern,
        rows: r,
        cols: c,
        grid: newGrid,
        baseGrid: newGrid,
        score: isPattern2 ? state.score : 0, 
        lives: isPattern2 ? state.lives : 5, 
        timeLeft: isPattern2 ? 30 : 30, // Reset timer for each pattern
        totalBlue: countTilesByType(newGrid, 'BLUE'),
        loseReason: '',
        tickCount: 0
      };
    case 'CLICK_TILE':
      // action.payload = id
      return handleTileClick(state, action.payload);
      
    case 'TICK_TIME':
      if (state.status !== 'PLAYING') return state;
      const newTime = state.timeLeft - 1;
      if (newTime <= 0) {
        return { ...state, status: 'LOSE', loseReason: 'Time ran out!', timeLeft: 0 };
      }
      return { ...state, timeLeft: newTime };

    case 'TICK_ANIMATION':
      // This runs frequently (e.g. 200ms) to scroll the red cells smoothly
      if (state.status !== 'PLAYING') return state;
      
      const newTickCount = state.tickCount + 1;
      
      // We process the 1D baseGrid array to derive the visual grid
      const animGrid = [...state.baseGrid.map(tile => ({ ...tile }))];
      
      const activePattern = state.currentPattern === 1 ? getRedPattern1(state.cols) : getRedPattern2(state.cols);

      // Draw shifted RED tiles mapped onto the 1D array
      for (let r = 0; r < state.rows; r++) {
        // Smoothly offset by tickCount pushing downwards. 
        const sourceIndex = (r - newTickCount) % activePattern.length;
        const boundedIndex = sourceIndex < 0 ? sourceIndex + activePattern.length : sourceIndex;
        
        activePattern[boundedIndex].forEach(c => {
          if (c >= state.cols || c < 0) return; // bounds safety
          const idx = r * state.cols + c;
          
          // "Red Priority": OBSTACLE overwrites anything
          if (animGrid[idx]) {
            animGrid[idx].type = 'OBSTACLE';
          }
        });
      }

      return { ...state, tickCount: newTickCount, grid: animGrid };

    case 'WIN_PATTERN':
      return { ...state, status: 'WON_PATTERN_1' };
    case 'TRANSITION':
      return { ...state, status: 'TRANSITION' };
    case 'WIN_GAME':
      return { ...state, status: 'WON_GAME' };
    case 'LOSE_GAME':
      return { ...state, status: 'LOSE', loseReason: action.payload || state.loseReason };
    case 'RESET':
      return { ...initialState, playerName: state.playerName, rows: state.rows, cols: state.cols, baseGrid: [] };
    default:
      return state;
  }
}

const GridGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [inputRows, setInputRows] = useState(30);
  const [inputCols, setInputCols] = useState(10);
  const [selectedPattern, setSelectedPattern] = useState(1);

  // Game loop 1: Timer (1 second)
  useGameLoop(
    () => {
      dispatch({ type: 'TICK_TIME' });
    },
    1000,
    state.status === 'PLAYING'
  );

  // Game loop 2: Smooth Animation Tick (every 250ms)
  useGameLoop(
    () => {
      dispatch({ type: 'TICK_ANIMATION' });
    },
    250,
    state.status === 'PLAYING'
  );

  // Check end game states to save score
  useEffect(() => {
    if (state.status === 'WON_GAME' || state.status === 'LOSE') {
      const saveScore = async () => {
        try {
          await scoreService.createScore({
            playerName: state.playerName || 'Anonymous',
            gameId: 'grid',
            score: state.score,
            details: {
              pattern: state.currentPattern,
              gridSize: `${state.rows}x${state.cols}`,
              timeLeft: state.timeLeft,
              result: state.status === 'WON_GAME' ? 'win' : 'lose',
              livesLeft: state.lives,
              totalBlueLeft: state.totalBlue
            }
          });
          console.log('Score saved successfully');
        } catch (err) {
          console.error('Score save failed:', err);
        }
      };
      saveScore();
    }
  }, [state.status]);

  const handleStart = () => {
    dispatch({ type: 'INIT_GAME', payload: { pattern: selectedPattern, rows: inputRows, cols: inputCols } });
  };

  const handleNextPattern = () => {
    dispatch({ type: 'TRANSITION' });
    setTimeout(() => {
      dispatch({ type: 'INIT_GAME', payload: { pattern: 2, rows: state.rows, cols: state.cols } });
    }, 1500);
  };

  // Implement automatic transition feature matching condition 2 requirements
  useEffect(() => {
    if (state.status === 'WON_PATTERN_1') {
      const timer = setTimeout(() => {
        handleNextPattern();
      }, 1500); // Wait 1.5s after victory to transition cleanly
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  return (
    <div className="grid-game-wrapper">
      <HUD 
        lives={state.lives}
        timeLeft={state.timeLeft}
        score={state.score}
        playerName={state.playerName}
        currentPattern={state.currentPattern}
        totalBlue={state.totalBlue}
      />

      {state.status === 'PLAYING' && (
        <Grid 
          gridState={state.grid}
          rows={state.rows}
          cols={state.cols}
          onTileClick={(id) => dispatch({ type: 'CLICK_TILE', payload: id })}
        />
      )}

      <GridControls 
        onStart={handleStart}
        onReset={() => dispatch({ type: 'RESET' })}
        playerName={state.playerName}
        onPlayerNameChange={(name) => dispatch({ type: 'SET_PLAYER_NAME', payload: name })}
        status={state.status}
        currentPattern={state.currentPattern}
        inputRows={inputRows}
        setInputRows={setInputRows}
        inputCols={inputCols}
        setInputCols={setInputCols}
        selectedPattern={selectedPattern}
        setSelectedPattern={setSelectedPattern}
      />

      <GameModal 
        status={state.status}
        reason={state.loseReason}
        score={state.score}
        onRetry={handleStart}
        onNext={handleNextPattern}
        onNewGrid={() => dispatch({ type: 'RESET' })}
      />
    </div>
  );
};

export default GridGame;
