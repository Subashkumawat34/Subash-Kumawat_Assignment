import React from 'react';
import './GameSelection.css';

export default function VideoModal({ isOpen, onClose, videoUrl, gameName }) {
  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Playing: {gameName}</h2>
        <div className="video-wrapper">
            <video controls autoPlay name="media" width="100%">
               <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
      </div>
    </div>
  );
}
