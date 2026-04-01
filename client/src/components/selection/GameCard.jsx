import React from 'react';
import './GameSelection.css';

export default function GameCard({ game, isActive, position, onClick }) {
  return (
    <div className={`game-card ${position}`} onClick={onClick} style={{cursor: 'pointer'}}>

      {/* Thumbnail or Video Background */}
      <div className="card-image-container">
        {isActive && game.videoUrl ? (
           <video 
             src={game.videoUrl}
             autoPlay 
             loop 
             muted 
             playsInline
             className="game-thumbnail thumbnail-blurred"
           />
        ) : (
           <img
             src={game.thumbnail}
             alt={game.name}
             className="game-thumbnail"
           />
        )}
        {/* Extra dark scrim on active card so text pops */}
        {isActive && <div className="card-active-scrim" />}
        {/* Bottom gradient for side cards */}
        {!isActive && <div className="card-overlay" />}
      </div>

      {/* ---- ACTIVE CARD overlays ---- */}
      {isActive && (
        <>
          {/* Green angled HOW TO PLAY badge at top */}
          <div className="how-to-play-badge">HOW TO PLAY</div>

          {/* Large centered text — this is the ONLY visible content on the blurred image */}
          <div className="how-to-play-text-overlay">
            <span className="how-to-play-label">HOW TO PLAY</span>
            <span className="how-to-play-game-name">{game.name}</span>
          </div>

          {/* Glassmorphic bottom info bar */}
          <div className="card-footer">
            <div className="card-footer-left">
              <div
                className="game-icon-dot"
                style={{
                  background: `linear-gradient(135deg, ${game.colors[0]}, ${game.colors[1]})`,
                }}
              />
              <span className="card-game-title">{game.name}</span>
            </div>
            <div className="card-footer-stats">
              <span>PLAYERS: <strong>{game.stats.players}</strong></span>
              {'duration' in game.stats
                ? <span>DURATION: <strong>{game.stats.duration}</strong></span>
                : <span>LEVELS: <strong>{game.stats.levels}</strong></span>
              }
              <span>AGE: <strong>{game.stats.age}</strong></span>
            </div>
          </div>
        </>
      )}

      {/* ---- SIDE CARDS: only show name label ---- */}
      {!isActive && (position === 'prev' || position === 'next') && (
        <div className="side-card-label">{game.name}</div>
      )}
    </div>
  );
}
