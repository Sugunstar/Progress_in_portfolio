'use client'

import { motion } from 'framer-motion'
import { config } from '@/lib/config'

interface PageViewProps {
  index: number
  isLeaving: boolean
  onClose: () => void
}

import { useRef, useEffect, useState } from 'react'

function VideoChromaKey({ src, onReady }: { src: string, onReady: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hasCalledReady = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext
    if (!gl) return

    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_image;
      
      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        if (color.g > 0.45 && color.g > color.r * 1.5 && color.g > color.b * 1.5) {
          color.a = 0.0;
        }
        gl_FragColor = color;
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
    ]), gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0, 1.0,  1.0, 1.0,  0.0, 0.0,
      0.0, 0.0,  1.0, 1.0,  1.0, 0.0,
    ]), gl.STATIC_DRAW);

    const posLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    const texLocation = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(texLocation, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let animationFrameId: number;

    const drawFrame = () => {
      if (video.paused || video.ended || video.videoWidth === 0) {
        animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }

      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!hasCalledReady.current) {
        hasCalledReady.current = true;
        onReady();
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    }

    video.play().catch(e => console.log("Video auto-play blocked:", e));
    drawFrame();

    return () => cancelAnimationFrame(animationFrameId);
  }, [onReady]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        crossOrigin="anonymous"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}

export function PageView({ index, isLeaving, onClose }: PageViewProps) {
  const [isVideoReady, setIsVideoReady] = useState(false)

  const getPageBackground = (idx: number) => {
    return undefined
  }

  const getPageVideo = (idx: number) => {
    if (idx === 0) return '/videos/page_1.mp4'
    if (idx === 1) return '/videos/page_2.mp4'
    return undefined
  }

  const pageBg = getPageBackground(index)
  const videoSrc = getPageVideo(index)

  if (!pageBg && !videoSrc) return null // Page 3 handles external link, no view rendered

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLeaving ? 0 : (videoSrc && !isVideoReady ? 0 : 1) }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'transparent',
        backdropFilter: 'blur(8px)',
        backgroundImage: pageBg ? `url('${pageBg}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 32px 32px',
        boxSizing: 'border-box',
        zIndex: 50,
      }}
    >
      {videoSrc && <VideoChromaKey src={videoSrc} onReady={() => setIsVideoReady(true)} />}

      <button
        onClick={onClose}
        style={{
          alignSelf: 'flex-start',
          background: 'none',
          border: 'none',
          color: config.colors.closeBtn,
          cursor: 'pointer',
          padding: '8px 0',
          zIndex: 20,
          position: 'relative',
          ...config.fonts.menuButtonFont
        }}
      >
        × {config.closeButtonLabel}
      </button>
    </motion.div>
  )
}
