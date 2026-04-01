import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { games } from '../../game/gameData';
import GameCard from './GameCard';
import VideoModal from './VideoModal';
import { useSwipe } from '../../hooks/useSwipe';
import { useKeyboard } from '../../hooks/useKeyboard';
import './GameSelection.css';

export default function GameSelection() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const nextGame = () =>
    setActiveIndex((cur) => (cur === games.length - 1 ? 0 : cur + 1));
  const prevGame = () =>
    setActiveIndex((cur) => (cur === 0 ? games.length - 1 : cur - 1));

  useKeyboard({
    ArrowRight: nextGame,
    ArrowLeft: prevGame,
    Enter: () => navigate(`/play/${games[activeIndex].id}`),
  });

  const swipeHandlers = useSwipe({
    onSwipeLeft: nextGame,
    onSwipeRight: prevGame,
  });

  const activeGame = games[activeIndex];

  return (
    <div className="game-selection-page">
      <div className="game-selection-container" {...swipeHandlers}>

        {/* Chamfered corner brackets */}
        <div className="corner-tl" />
        <div className="corner-tr" />
        <div className="corner-bl" />
        <div className="corner-br" />

        {/* Header: grid icon | title | hamburger icon */}
        <div className="selection-header">
          <div className="header-icon-left">
            <div className="grid-icon">
              {[...Array(9)].map((_, i) => <span key={i} />)}
            </div>
          </div>

          <h2 className="selection-title">SELECT YOUR GAME</h2>

          <div className="header-icon-right">
            <div className="menu-icon">
              <span /><span /><span />
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel-section">

          <div className="carousel-track">
            {games.map((game, index) => {
              let pos = 'hidden';
              if (index === activeIndex) pos = 'active';
              else if (index === (activeIndex - 1 + games.length) % games.length) pos = 'prev';
              else if (index === (activeIndex + 1) % games.length) pos = 'next';

              return (
                <GameCard
                  key={game.id}
                  game={game}
                  isActive={index === activeIndex}
                  position={pos}
                  onClick={() => {
                    if (index === activeIndex) {
                      setIsVideoModalOpen(true);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Actions: Arrows + START GAME */}
        <div className="action-section">
          <button className="nav-btn left" onClick={prevGame} aria-label="Previous">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button
            className="start-game-btn"
            onClick={() => navigate(`/play/${activeGame.id}`)}
          >
            START GAME
          </button>

          <button className="nav-btn right" onClick={nextGame} aria-label="Next">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        {/* VideoModal kept accessible for future use */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={activeGame.videoUrl}
          gameName={activeGame.name}
        />
      </div>
    </div>
  );
}
