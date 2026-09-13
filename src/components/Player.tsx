import { useEffect, useRef, useState } from "react";
import { useSongData } from "../context/SongContext"
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    nextSong,prevSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress]=useState(0);
  const [progressTime, setProgressTime] = useState<string>('00:00');
  const [totalDuration, setTotalDuration] = useState<string>('00:00');

  useEffect(()=>{
    const audio = audioRef.current;
    if(!audioRef)return;
    const handleLoadedMetadata=()=>{
      console.log('loadedmetadata',audio?.duration);
      setDuration(audio?.duration || 0);
      if(audio?.duration){
       setTotalDuration(formatTime(Math.floor(audio.duration)))  
      }
    }
    const handleTimeUpdate=()=>{
      console.log('timeupdate',audio?.currentTime);
      if(audio?.currentTime){
        setProgressTime(formatTime(Math.floor(audio.currentTime)))
      }
      setProgress(audio?.currentTime||0);
    }

    audio?.addEventListener('loadedmetadata',handleLoadedMetadata);
    audio?.addEventListener('timeupdate',handleTimeUpdate);

    return () => {
      audio?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
    }

  },[song])

  const formatTime = (time:number) => {
    let minutes = Math.floor(time/60);
    time = time%60;
    let seconds=time;
    return `${minutes<=9?`0${minutes}`:minutes}:${seconds<=9?`0${seconds}`:seconds}`
  }

  const handlePlayPause = () => {
    if(audioRef.current){
      if(isPlaying){
        audioRef.current.pause();
      }
      else{
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const changeDuration = (e:React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const newTime = (parseFloat(e.target.value)/100)*duration;
    if(audioRef.current){
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  }

  const volumeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)/100;
    setVolume(newVolume);
    if(audioRef.current){
      audioRef.current.volume=newVolume;
    }
  }

  useEffect(()=>{
    fetchSingleSong();
  },[selectedSong]);

  return (
    <div>
      {
        song && 
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
          <div className="lg:flex items-center gap-4">
            <img
              src={song?.thumbnail ? song?.thumbnail : '/song_thumbnail.jpeg'}
              alt={song?.title}
              className="w-12"  
            />
            <div className="hidden md:block">
              <p>{song?.title}</p>
              <p>{song?.description.slice(0,30)}...</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            {
              song?.audio && (
                <audio src={song?.audio} autoPlay={isPlaying} ref={audioRef}/>
              )
            }
            <div className="w-full flex items-center font-thin text-green-400 gap-4">
              <input
                type="range"
                min={"0"}
                max={"100"}
                className="w-30 md:w-75"
                value={(progress/duration)*100 || 0}
                onChange={changeDuration}
              />
              <span>{`${progressTime}/${totalDuration}`}</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="cursor-pointer" onClick={prevSong}>
                <GrChapterPrevious />
              </span>
              <span onClick={handlePlayPause} className="flex items-center justify-center p-2 rounded-full text-black bg-slate-200">
                {
                  isPlaying ? <FaPause /> : <FaPlay />
                }
              </span>
              <span className="cursor-pointer" onClick={nextSong}>
                <GrChapterNext />
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <span>
                <FaVolumeUp />
            </span>
            <input
              type="range"
              min={"0"}
              max={"100"}
              step={"0.01"}
              className="w-16 md:w-32"
              value={volume*100}
              onChange={volumeChange}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default Player