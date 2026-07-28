'use client';
import type { AudioPlayerUploadProps } from '@/src/types';
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '@/src/services/api';



export default function AudioPlayerUpload({
  audioAssetRef,
  onAudioUploaded,
  audioLoading,
  setAudioLoading,
}: AudioPlayerUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const handleAudioChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith('audio/')) {
      toast.error('Selecione apenas arquivos de áudio válidos.');
      return;
    }

    const toastId = toast.loading('Enviando áudio...');
    try {
      setAudioLoading(true);
      
      const localUrl = URL.createObjectURL(arquivo);
      setAudioUrl(localUrl);

      const dados = await api.uploadAudio(arquivo);

      onAudioUploaded(dados.assetId);
      toast.success('Áudio enviado com sucesso!', { id: toastId });
    } catch (error: any) {
      console.error('Erro ao subir áudio:', error);
      toast.error(`Falha no upload do áudio: ${error.message}`, { id: toastId });
    } finally {
      setAudioLoading(false);
    }
  };

  useEffect(() => {
    if (!audioUrl || !audioRef.current || !canvasRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 64;
      
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyzerRef.current);
      analyzerRef.current.connect(audioContextRef.current.destination);
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyzer = analyzerRef.current;

    if (!analyzer || !ctx) return;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const drawWaveform = () => {
      if (!canvas) return;
      animationRef.current = requestAnimationFrame(drawWaveform);

      analyzer.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = isPlaying ? (dataArray[i] / 2) : 4; 
        if (barHeight < 4) barHeight = 4;

        ctx.fillStyle = isPlaying ? '#87240E' : '#A3A3A3';

        const y = (canvas.height - barHeight) / 2;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth - 3, barHeight, 2);
        ctx.fill();

        x += barWidth;
      }
    };

    drawWaveform();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [audioUrl, isPlaying]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full border border-[#2D2D2D] rounded-lg p-4 bg-white shadow-sm flex flex-col gap-4">
      <label className="text-black font-medium text-base">Áudio da Publicação</label>
      
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        className="hidden"
        onChange={handleAudioChange}
      />

      {!audioUrl ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={audioLoading}
          className="w-full h-14 border-2 border-dashed border-[#87240E] text-[#87240E] rounded-lg flex items-center justify-center gap-2 font-medium text-sm hover:bg-[#87240E]/5 transition-all disabled:opacity-50"
        >
          {audioLoading ? (
            <span className="animate-pulse">Subindo arquivo de áudio...</span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
              </svg>
              <span>Selecionar e Enviar Áudio</span>
            </>
          )}
        </button>
      ) : (
        <div className="flex items-center gap-4 bg-[#F9F9F9] border border-[#E0E0E0] rounded-xl p-3 w-full">
          <button
            type="button"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#87240E] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform shrink-0"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <div className="flex-1 h-12 flex items-center relative">
            <canvas 
              ref={canvasRef} 
              width={260} 
              height={48} 
              className="w-full h-full"
            />
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
              onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
              onEnded={() => setIsPlaying(false)}
              crossOrigin="anonymous"
            />
          </div>

          <div className="text-xs font-mono text-[#6C6C6C] shrink-0 min-w-18.75 text-right">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <button
            type="button"
            onClick={() => {
              setAudioUrl(null);
              onAudioUploaded('');
              setIsPlaying(false);
            }}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            title="Remover áudio"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
      
      {audioAssetRef && !audioLoading && (
        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
          ✓ ID sincronizado no Sanity
        </span>
      )}
    </div>
  );
}
