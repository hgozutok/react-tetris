import React, { useState } from "react";
import { createStage } from "../gameHelpers";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rows, setRows, level, setLevel] = useStage();

  const movePlayer = ({ x, y, collided }) => {
    updatePlayerPos({ x, y, collided });

    if (collided) {
      resetPlayer();
      setGameOver(true);

      setDropTime(null);
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const drop = () => {
    if (!gameOver) {
      setDropTime(1000 / (level + 1));
      movePlayer({ x: 0, y: 1, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setLevel(0);
    setRows(0);
  };

  const dropPlayer = () => {
    if (!gameOver) {
      setDropTime(null);
      movePlayer({ x: 0, y: 1, collided: false });
    }
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer({ x: -1, y: 0, collided: false });
      } else if (keyCode === 39) {
        movePlayer({ x: 1, y: 0, collided: false });
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  const update = ({ time }) => {
    if (!gameOver) {
      if (dropTime === null) {
        setDropTime(1000);
      }

      if (time > dropTime) {
        movePlayer({ x: 0, y: 1, collided: false });
      }

      dropTime = time;
    }
  };

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
