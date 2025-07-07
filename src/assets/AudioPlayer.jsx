import React, { useState,useRef,useEffect } from 'react';
import image from '../assets/cover2.jpeg';
import audioSrc from '../assets/audio.mp3';
import { MdPause,MdPlayArrow } from 'react-icons/md';
import './AudioPlayer.css';

function AudioPlayer() {

  const [isPlaying,setIsPlaying] = useState(false);
  const [currentTime,setCurrentTime] = useState(0);
  const [duration,setDuration] = useState(0);

  const audioRef = useRef(null);

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};


  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  }

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  }

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  const handlePlayPause = () => {
    if(isPlaying){
        handlePause();
    }else{
        handlePlay();
    }
  };
  
useEffect(() => {
  const audio = audioRef.current;

  if (audio) {
    audio.addEventListener("timeupdate", handleTimeUpdate);
  }

  return () => {
    if (audio) {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  };
}, []);


  return (
    <>
        <div className="player-card">
            <img src={image} alt="cover-img" />
            <input type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}  
            />
            <audio ref={audioRef} src={audioSrc}></audio>
            <div className="track-duration">
                <p>{formatTime(currentTime)}</p>
                <p>{formatTime(duration)}</p>
            </div>
            <button onClick={handlePlayPause}>
               <span className='material-symbols-rounded'>
                {isPlaying ? <MdPause /> : <MdPlayArrow />}
               </span>
            </button> 
        </div>
    </>
  )
}

export default AudioPlayer