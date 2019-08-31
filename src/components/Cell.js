import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { movePlayer } from '../App/Actions';
import { randomNum } from '../helpers';

const Cell = ({ cell, moveThePlayer, playerTurn }) => {
  const {
    ladder, snake, title, player1, player2
  } = cell;

  let [theLadder, setTheLadder] = useState(ladder);
  let [theSnake, setTheSnake] = useState(snake);

  useEffect(() => {
    if (snake){
      if (
        snake > parseInt(title) ||
        snake === parseInt(title)
      ){
        const newSnakeTarget = parseInt(title) - (randomNum(13, 18));
        if (newSnakeTarget > 10){
          setTheSnake(newSnakeTarget);
        } else {
          setTheSnake(null);
        }
      }
    }
    if (ladder){
      if (
        ladder < parseInt(title) ||
        ladder === parseInt(title)
      ){
        let newLadderTarget = parseInt(title) + (randomNum(13, 18));
        if ((newLadderTarget >= 100)){
          newLadderTarget = newLadderTarget - randomNum(6, 5);
          setTheLadder(newLadderTarget);
        } else {
          setTheLadder(null);
        }
      }
    }
    if (ladder && snake){
      if (randomNum(0, 1)){
        setTheLadder(null);
      } else {
        setTheSnake(null);
      }
    }
    if (!(parseInt(title)) && (ladder || snake)){
      setTheLadder(null);
      setTheSnake(null);
    }
  }, [])

  useEffect(() => {
    const isPlayerHere = player1 || player2;
    let timer = setTimeout(function(){
      if (theSnake && isPlayerHere){
        moveThePlayer(playerTurn, theSnake);
      }
      if (theLadder && isPlayerHere){
        moveThePlayer(playerTurn, theLadder);
      }
      return clearTimeout(timer);
    }, 700);
  }, [cell]);



  return(
    <div className={`cell-item cell-item-no-${title}`}>
      <p className={`cell-title ${!(parseInt(title)) ? 'special' : ''}`}>{title}</p>
      {
        theSnake
          ? (
            <div className="snake">{theSnake}</div>
          ) : null
      }
      {
        theLadder
          ? (
            <div className="ladder">{theLadder}</div>
          ) : null
      }
      <div className="players-container">
        {
          player1
            ? (
              <div className="player-1"></div>
            ) : null
        }
        {
          player2
            ? (
              <div className="player-2"></div>
            ) : null
        }
      </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    playerTurn: state.status.get('turn')
  }
}

function mapDispatchToProps(dispatch){
  return {
    moveThePlayer: (player, to) => dispatch(movePlayer(player, to)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
