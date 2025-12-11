import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Monitor, 
  Trash2, 
  FileText, 
  Mail, 
  Globe, 
  Minus, 
  X, 
  Maximize2, 
  Briefcase, 
  Cpu,
  Github,
  Linkedin,
  Book,
  Star,
  GitFork,
  MapPin,
  Link as LinkIcon,
  Users,
  ExternalLink,
  Power,
  Printer,
  Download,
  Volume2,
  VolumeX,
  HelpCircle
} from 'lucide-react';

// --- Constants & Data ---

// Classic Windows 95/98 Icons
const WIN_ICONS = {
  computer: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-5.png',
  recycle: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png',
  notepad: 'https://win98icons.alexmeub.com/icons/png/notepad-5.png',
  network: 'https://win98icons.alexmeub.com/icons/png/connected_world-3.png',
  mail: 'https://win98icons.alexmeub.com/icons/png/outlook_express-4.png',
  briefcase: 'https://win98icons.alexmeub.com/icons/png/briefcase-4.png',
  programs: 'https://win98icons.alexmeub.com/icons/png/programs-2.png',
  settings: 'https://win98icons.alexmeub.com/icons/png/settings_gear-2.png',
  documents: 'https://win98icons.alexmeub.com/icons/png/directory_open-2.png',
  folder: 'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png',
  shutdown: 'https://win98icons.alexmeub.com/icons/png/shut_down_normal-2.png',
  tetris: 'https://win98icons.alexmeub.com/icons/png/game_solitaire-1.png', 
  winLogo: 'https://win98icons.alexmeub.com/icons/png/windows-0.png',
  // Standard Wikimedia URL for Clippy
  clippy: 'https://upload.wikimedia.org/wikipedia/en/6/61/Clippy.png', 
  ie: 'https://win98icons.alexmeub.com/icons/png/msie1-0.png',
  pdf: 'https://win98icons.alexmeub.com/icons/png/chm-4.png'
};

const STARTUP_SOUND = "https://upload.wikimedia.org/wikipedia/commons/6/69/Windows_95_Startup.ogg";

const ICONS = [
  { id: 'about', label: 'About_Me.txt', icon: WIN_ICONS.notepad, type: 'notepad' },
  { id: 'projects', label: 'My Projects', icon: WIN_ICONS.folder, type: 'explorer' },
  { id: 'skills', label: 'My Computer', icon: WIN_ICONS.computer, type: 'system' },
  { id: 'contact', label: 'Contact', icon: WIN_ICONS.mail, type: 'mail' },
  { id: 'resume', label: 'Resume.pdf', icon: WIN_ICONS.briefcase, type: 'pdf' },
  { id: 'tetris', label: 'Tetris', icon: WIN_ICONS.tetris, type: 'tetris' },
  { id: 'recycle', label: 'Recycle Bin', icon: WIN_ICONS.recycle, type: 'recycle' },
];

const SKILLS = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'CI/CD', 'Linux'] },
];

const PROJECTS = [
  {
    id: 'alumni',
    title: 'Alumni Connect',
    desc: 'A platform to bridge the gap between alumni and current students.',
    stack: ['MERN Stack', 'Redux', 'Render'],
    year: '2024',
    url: 'https://alumni-sih-92cp.onrender.com'
  },
  {
    id: 'chitchat',
    title: 'Chit-Chat',
    desc: 'Real-time messaging application with instant notifications.',
    stack: ['Socket.io', 'Express', 'React', 'Render'],
    year: '2024',
    url: 'https://real-time-chat-zx2e.onrender.com'
  },
  {
    id: 'texteditor',
    title: 'Text Editor',
    desc: 'A lightweight text editor implemented with modern web technologies.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    year: '2023',
    url: 'https://github.com/Mr-animesh/text-editor'
  },
  {
    id: 'hospital',
    title: 'Hospital Bed Manager',
    desc: 'A management system for tracking hospital bed availability and patient allocation.',
    stack: ['JavaScript', 'Database'],
    year: '2023',
    url: 'https://github.com/Mr-animesh/hospital-bed-management'
  }
];

// --- Utility Components ---

const WinButton = ({ children, onClick, className = "", active = false, small = false, disabled = false, ...props }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-center
      border-t-2 border-l-2 border-r-2 border-b-2 
      ${active 
        ? 'border-t-black border-l-black border-r-white border-b-white bg-gray-200' 
        : 'border-t-white border-l-white border-r-black border-b-black bg-gray-300'
      }
      active:border-t-black active:border-l-black active:border-r-white active:border-b-white
      ${small ? 'p-0.5' : 'px-2 py-1'}
      focus:outline-none select-none
      ${disabled ? 'text-gray-500' : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

// --- Clippy Component ---

const Clippy = () => {
  const [showBubble, setShowBubble] = useState(true);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="absolute bottom-4 right-4 z-50 flex flex-col items-end pointer-events-auto">
        {showBubble && (
            <div className="relative bg-[#FFFFCC] border border-black p-2 rounded mb-4 w-48 text-xs font-sans shadow-md animate-bounce-slight">
                <p>It looks like you're browsing a portfolio.</p>
                <p className="mt-1 font-bold">Would you like some help?</p>
                <div className="mt-2 flex gap-2">
                    <button 
                      className="border border-black px-2 py-0.5 bg-gray-100 hover:bg-blue-100 active:bg-blue-200" 
                      onClick={() => setShowBubble(false)}
                    >
                      Dismiss
                    </button>
                </div>
                 {/* Speech bubble tail */}
                 <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-black border-r-[8px] border-r-transparent"></div>
                 <div className="absolute -bottom-[6px] right-8 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-[#FFFFCC] border-r-[8px] border-r-transparent"></div>
            </div>
        )}
        {imgError ? (
           <div 
             onClick={() => setShowBubble(true)}
             className="w-12 h-12 bg-gray-200 border-2 border-white border-r-black border-b-black flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
             title="Clippy (Image Failed)"
           >
             <HelpCircle size={32} className="text-blue-800" />
           </div>
        ) : (
          <img 
              src={WIN_ICONS.clippy} 
              alt="Clippy"
              className="w-16 h-16 object-contain cursor-pointer hover:scale-110 transition-transform drop-shadow-lg pixelated"
              onClick={() => setShowBubble(true)}
              onError={() => setImgError(true)}
          />
        )}
    </div>
  )
}

// --- Resume Component ---

const ResumeViewer = () => {
  const resumeRef = useRef(null);

  const handlePrint = () => {
    // Basic browser print - user can "Save as PDF" from the print dialog
    const content = resumeRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Animesh Jain - Resume</title>');
    printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>'); // Inject tailwind for styling in print
    printWindow.document.write('</head><body class="p-8">');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    // Allow time for tailwind to load/apply
    setTimeout(() => {
        printWindow.print();
    }, 1000);
  };

  const handleOpenNewWindow = () => {
    const content = resumeRef.current.innerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>Animesh Jain - Resume</title>');
    newWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
    newWindow.document.write('</head><body class="bg-gray-100 p-8 flex justify-center"><div class="max-w-4xl w-full bg-white shadow p-8">');
    newWindow.document.write(content);
    newWindow.document.write('</div></body></html>');
    newWindow.document.close();
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
        {/* Toolbar */}
        <div className="flex gap-2 p-1 border-b-2 border-gray-400 bg-gray-200 shrink-0">
            <WinButton small onClick={handlePrint} className="flex gap-1 items-center px-2">
                <Printer size={14} /> Print / Save PDF
            </WinButton>
            <WinButton small onClick={handleOpenNewWindow} className="flex gap-1 items-center px-2">
                <ExternalLink size={14} /> Open in New Window
            </WinButton>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 bg-gray-500 shadow-inner">
            <div ref={resumeRef} className="max-w-[800px] mx-auto bg-white p-8 shadow-lg text-black font-sans text-sm min-h-[1000px]">
                {/* Header */}
                <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
                    <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">Animesh Jain</h1>
                    <p className="text-gray-600">+91-7697663411 | Mr-animesh (Github) | animesh-jain936 (Linkedin)</p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-blue-800">Technical Skills</h2>
                    <div className="grid grid-cols-[120px_1fr] gap-y-1">
                        <span className="font-bold">Languages:</span>
                        <span>C/C++, JavaScript (ES6+), TypeScript, HTML/CSS, Tailwind CSS, Lua, Solidity, Rust</span>
                        
                        <span className="font-bold">Frameworks:</span>
                        <span>React, Node.js, Next.js, Hono, JWT, Material-UI</span>
                        
                        <span className="font-bold">Tools:</span>
                        <span>Git, Docker, Vim, VS Code, WSL, Postman, Cloudflare Workers, MetaMask API, Phantom</span>
                        
                        <span className="font-bold">Libraries:</span>
                        <span>Mongoose, Prisma, Lucide-react, npm, pnpm, web3.js, Hardhat</span>
                    </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-blue-800">Experience</h2>
                    
                    <div className="mb-4">
                        <div className="flex justify-between font-bold">
                            <span>Full-Stack Intern @ Alfido Tech Coorporation</span>
                            <span>June 2024 - Jan 2025</span>
                        </div>
                        <ul className="list-disc ml-5 mt-1 text-gray-700 space-y-1">
                            <li>Built a real-time chat application using Socket.io and MongoDB, enabling instant messaging with 100ms latency and support for 1,000+ concurrent users.</li>
                            <li>Developed an AI-powered management system for organizational workflow automation, improving task efficiency by 40% and integrating secure role-based access control.</li>
                            <li>Explored ways of GitHub collaboration in a remote setting of a team project.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between font-bold">
                            <span>AI Intern @ Elite Tech Coorporation</span>
                            <span>June 2025 - Aug 2025</span>
                        </div>
                        <ul className="list-disc ml-5 mt-1 text-gray-700 space-y-1">
                            <li>Developed a Text Summarization Tool using NLP techniques, achieving 85% ROUGE score for concise article summaries.</li>
                            <li>Built a Speech-to-Text System with pre-trained models like SpeechRecognition and Wav2Vec, delivering &gt;90% transcription accuracy.</li>
                            <li>Implemented a Neural Style Transfer model to apply artistic filters on images using deep learning.</li>
                        </ul>
                    </div>
                </div>

                {/* Projects */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-blue-800">Projects</h2>
                    
                    <div className="mb-3">
                        <div className="flex justify-between">
                            <span className="font-bold">Chit-Chat</span>
                            <span className="text-gray-500 italic">React, Tailwind, MongoDB, Docker, Socket.io</span>
                        </div>
                        <ul className="list-disc ml-5 mt-1 text-gray-700">
                            <li>Built an anonymous real-time chat app supporting instant messaging with &lt;100ms latency and image sending.</li>
                            <li>Used React-hot-toast, Lucide-react and DaisyUI for UI components and themes.</li>
                            <li>Used Zustand instead of Recoil for lightweight state management.</li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between">
                            <span className="font-bold">Alumni-Connect</span>
                            <span className="text-gray-500 italic">Next.js, MongoDB, Tailwind</span>
                        </div>
                        <ul className="list-disc ml-5 mt-1 text-gray-700">
                            <li>Platform for alumni-student networking with AI career guidance and video chat.</li>
                            <li>Integrated OpenAI API, WebRTC, and secure MongoDB Atlas backend.</li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between">
                            <span className="font-bold">Likh Editor</span>
                            <span className="text-gray-500 italic">C, C-make</span>
                        </div>
                        <ul className="list-disc ml-5 mt-1 text-gray-700">
                            <li>Built a terminal-based text editor in C featuring syntax highlighting and search.</li>
                            <li>Optimized performance using low-level buffer and input handling.</li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between">
                            <span className="font-bold">Draw-App</span>
                            <span className="text-gray-500 italic">Next.js, Turborepo, WebSockets</span>
                        </div>
                        <ul className="list-disc ml-5 mt-1 text-gray-700">
                            <li>Real-time collaborative whiteboard synced via WebSockets (&lt;150ms latency).</li>
                            <li>Used monorepo architecture and implemented offline support/autosave.</li>
                        </ul>
                    </div>
                </div>

                {/* Education */}
                <div>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-blue-800">Education</h2>
                    <div className="flex justify-between mb-1">
                        <span className="font-bold">Teerthanker Mahaveer University, Moradabad</span>
                        <span>2023 - 2027</span>
                    </div>
                    <div className="text-gray-700 mb-2">B.Tech in Computer Science and Engineering (Current CGPA: 8.5)</div>
                    
                    <div className="flex justify-between mb-1">
                        <span className="font-bold">Christ Senior Secondary School, CBSE</span>
                    </div>
                    <div className="text-gray-700">10th: 95.6%, 12th: 91.2%</div>
                </div>
            </div>
        </div>
    </div>
  );
};

// --- Tetris Component ---

const TETROMINOS = {
  I: { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: 'bg-cyan-500' },
  J: { shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], color: 'bg-blue-600' },
  L: { shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: 'bg-orange-500' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-400' },
  S: { shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: 'bg-green-600' },
  T: { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: 'bg-purple-600' },
  Z: { shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: 'bg-red-600' },
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const createBoard = () => Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(0));

const Tetris = () => {
  const [board, setBoard] = useState(createBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Game Loop Speed
  const speed = 800; 

  const getRandomTetromino = () => {
    const keys = Object.keys(TETROMINOS);
    const randKey = keys[Math.floor(Math.random() * keys.length)];
    return TETROMINOS[randKey];
  };

  const spawnPiece = () => {
    const newPiece = getRandomTetromino();
    setCurrentPiece(newPiece);
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece.shape[0].length / 2), y: 0 });
    
    // Check immediate collision on spawn (Game Over)
    if (checkCollision(newPiece.shape, { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece.shape[0].length / 2), y: 0 }, board)) {
      setGameOver(true);
    }
  };

  const checkCollision = (pieceShape, pos, currentBoard) => {
    for (let y = 0; y < pieceShape.length; y++) {
      for (let x = 0; x < pieceShape[y].length; x++) {
        if (pieceShape[y][x] !== 0) {
          const newX = x + pos.x;
          const newY = y + pos.y;
          
          if (
            newX < 0 || 
            newX >= BOARD_WIDTH || 
            newY >= BOARD_HEIGHT || 
            (newY >= 0 && currentBoard[newY][newX] !== 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const rotate = (matrix) => {
    return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
  };

  const rotatePiece = () => {
    if (!currentPiece || gameOver || isPaused) return;
    const rotatedShape = rotate(currentPiece.shape);
    if (!checkCollision(rotatedShape, position, board)) {
      setCurrentPiece({ ...currentPiece, shape: rotatedShape });
    }
  };

  const moveHorizontally = (dir) => {
    if (!currentPiece || gameOver || isPaused) return;
    const newPos = { ...position, x: position.x + dir };
    if (!checkCollision(currentPiece.shape, newPos, board)) {
      setPosition(newPos);
    }
  };

  const drop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const newPos = { ...position, y: position.y + 1 };
    
    if (!checkCollision(currentPiece.shape, newPos, board)) {
      setPosition(newPos);
    } else {
      // Lock piece
      const newBoard = board.map(row => [...row]);
      let rowsCleared = 0;

      // Place piece on board
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
             const boardY = y + position.y;
             const boardX = x + position.x;
             if (boardY >= 0 && boardY < BOARD_HEIGHT) {
               newBoard[boardY][boardX] = currentPiece.color;
             }
          }
        });
      });

      // Clear lines
      const sweepedBoard = newBoard.reduce((acc, row) => {
        if (row.every(cell => cell !== 0)) {
          rowsCleared += 1;
          acc.unshift(Array(BOARD_WIDTH).fill(0));
        } else {
          acc.push(row);
        }
        return acc;
      }, []);

      setBoard(sweepedBoard);
      setScore(prev => prev + (rowsCleared * 100));
      spawnPiece();
    }
  }, [currentPiece, board, position, gameOver, isPaused]);

  useEffect(() => {
    if (!currentPiece && !gameOver) {
      spawnPiece();
    }
  }, [currentPiece, gameOver]);

  // Game Loop
  useEffect(() => {
    if (gameOver || isPaused) return;
    const interval = setInterval(drop, speed);
    return () => clearInterval(interval);
  }, [drop, gameOver, isPaused]);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft') moveHorizontally(-1);
      if (e.key === 'ArrowRight') moveHorizontally(1);
      if (e.key === 'ArrowDown') drop();
      if (e.key === 'ArrowUp') rotatePiece();
      if (e.key === 'p' || e.key === 'P') setIsPaused(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, currentPiece, board, gameOver, isPaused]);

  const resetGame = () => {
    setBoard(createBoard());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setCurrentPiece(null); // Triggers spawn in useEffect
  };

  // Render Helpers
  const renderCell = (cellValue, x, y) => {
    // Check if cell is part of the falling piece
    let activeColor = null;
    if (currentPiece) {
      const pieceY = y - position.y;
      const pieceX = x - position.x;
      if (
        pieceY >= 0 && 
        pieceY < currentPiece.shape.length && 
        pieceX >= 0 && 
        pieceX < currentPiece.shape[0].length &&
        currentPiece.shape[pieceY][pieceX] !== 0
      ) {
        activeColor = currentPiece.color;
      }
    }

    const finalColor = activeColor || (cellValue !== 0 ? cellValue : 'bg-black');
    
    return (
      <div 
        key={`${x}-${y}`} 
        className={`w-5 h-5 border border-gray-800 ${finalColor}`}
      />
    );
  };

  return (
    <div className="bg-[#c0c0c0] p-1 flex flex-col items-center gap-2 select-none h-full w-full max-w-sm mx-auto">
      {/* Score Board */}
      <div className="flex justify-between w-full border-2 border-gray-400 border-b-white border-r-white p-1 bg-[#c0c0c0] inset-shadow">
        <div className="font-bold">SCORE: <span className="font-mono text-red-600 bg-black px-1 ml-1">{score}</span></div>
        <div className="text-xs self-center">ARROWS: Move/Rot | P: Pause</div>
      </div>

      {/* Game Board */}
      <div className="relative border-4 border-gray-400 border-r-white border-b-white bg-black p-0.5">
        {gameOver && (
          <div className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center text-white">
            <h2 className="text-xl font-bold mb-2 text-red-500">GAME OVER</h2>
            <p className="mb-4">Final Score: {score}</p>
            <WinButton onClick={resetGame}>Try Again</WinButton>
          </div>
        )}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center text-white font-bold animate-pulse">
            PAUSED
          </div>
        )}
        
        <div className="grid grid-rows-[repeat(20,minmax(0,1fr))] gap-0">
          {board.map((row, y) => (
             <div key={y} className="grid grid-cols-[repeat(10,minmax(0,1fr))] gap-0">
               {row.map((cell, x) => renderCell(cell, x, y))}
             </div>
          ))}
        </div>
      </div>
      
      {/* Controls for Mobile */}
      <div className="flex gap-2 w-full justify-center mt-1 md:hidden">
         <WinButton small onClick={() => moveHorizontally(-1)}>←</WinButton>
         <WinButton small onClick={drop}>↓</WinButton>
         <WinButton small onClick={rotatePiece}>↻</WinButton>
         <WinButton small onClick={() => moveHorizontally(1)}>→</WinButton>
      </div>
    </div>
  );
};

// --- Mock Browser Components ---

const GithubMock = ({ url }) => (
  <div className="flex flex-col h-full bg-[#0d1117] text-white overflow-auto font-sans">
    {/* Nav */}
    <div className="bg-[#161b22] p-4 flex items-center gap-4 border-b border-[#30363d]">
      <Github size={32} className="text-white" />
      <input type="text" placeholder="Search or jump to..." className="bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-sm w-64" />
      <div className="flex gap-4 text-sm font-bold ml-4">
        <span>Pull requests</span>
        <span>Issues</span>
        <span>Codespaces</span>
        <span>Marketplace</span>
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto w-full p-4 gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 flex flex-col gap-4">
         <div className="w-64 h-64 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center overflow-hidden">
            <Users size={64} className="text-gray-400" />
         </div>
         <div>
           <div className="flex items-center gap-2">
             <h1 className="text-2xl font-bold">Animesh Jain</h1>
             <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" title="Open in new tab">
                <ExternalLink size={18} />
             </a>
           </div>
           <p className="text-gray-400 text-xl">Mr-animesh</p>
         </div>
         <button className="w-full bg-[#21262d] border border-[#30363d] rounded py-1 text-sm font-bold">Follow</button>
         <div className="text-sm text-gray-400 space-y-2">
            <div className="flex items-center gap-2"><Users size={16} /> 1.2k followers · 50 following</div>
            <div className="flex items-center gap-2"><MapPin size={16} /> Internet</div>
            <div className="flex items-center gap-2"><LinkIcon size={16} /> portfolio.com</div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
         {/* Tabs */}
         <div className="flex gap-4 border-b border-[#30363d] mb-4 text-sm">
            <div className="border-b-2 border-[#f78166] py-2 flex items-center gap-2 font-bold"><Book size={16}/> Overview</div>
            <div className="py-2 flex items-center gap-2 text-gray-400"><Book size={16}/> Repositories <span className="bg-[#21262d] px-2 rounded-full text-xs">42</span></div>
            <div className="py-2 flex items-center gap-2 text-gray-400"><Star size={16}/> Stars</div>
         </div>

         {/* Pinned */}
         <div className="mb-4">
           <h2 className="text-sm mb-4">Pinned</h2>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {PROJECTS.map(p => (
                <div key={p.id} className="border border-[#30363d] rounded p-4 bg-[#0d1117]">
                   <div className="flex items-center gap-2 text-[#58a6ff] font-bold mb-2">
                     <Book size={16} />
                     <span>{p.title.replace(/\s+/g, '-').toLowerCase()}</span>
                     <span className="text-xs text-gray-400 border border-[#30363d] rounded-full px-2 ml-auto">Public</span>
                   </div>
                   <p className="text-xs text-gray-400 mb-4">{p.desc}</p>
                   <div className="flex gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> {p.stack[0]}</div>
                      <div className="flex items-center gap-1"><Star size={14} /> {Math.floor(Math.random() * 100)}</div>
                      <div className="flex items-center gap-1"><GitFork size={14} /> {Math.floor(Math.random() * 20)}</div>
                   </div>
                </div>
              ))}
           </div>
         </div>
         
         {/* Contribution Graph Mock */}
         <div className="border border-[#30363d] rounded p-4 mt-4">
            <h2 className="text-sm mb-2">1,337 contributions in the last year</h2>
            <div className="flex gap-1 h-24 items-end overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="w-3 bg-[#006d32] rounded-sm" style={{ height: `${Math.random() * 100}%`, opacity: Math.random() }}></div>
                ))}
            </div>
         </div>
      </div>
    </div>
  </div>
);

const LinkedinMock = ({ url }) => (
  <div className="flex flex-col h-full bg-[#f3f2ef] text-black overflow-auto font-sans">
    {/* Nav */}
    <div className="bg-white px-8 py-2 border-b flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Linkedin size={36} className="text-[#0a66c2] bg-white" />
        <input type="text" placeholder="Search" className="bg-[#eef3f8] px-4 py-2 rounded w-64 text-sm" />
      </div>
      <div className="flex gap-6 text-gray-500 text-xs items-center">
         <div className="flex flex-col items-center"><Monitor size={20} /><span>Home</span></div>
         <div className="flex flex-col items-center"><Users size={20} /><span>My Network</span></div>
         <div className="flex flex-col items-center"><Briefcase size={20} /><span>Jobs</span></div>
         <div className="flex flex-col items-center"><Mail size={20} /><span>Messaging</span></div>
         <div className="w-6 h-6 rounded-full bg-gray-400"></div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto w-full py-6 flex gap-6">
       {/* Main Profile Card */}
       <div className="flex-1 space-y-4">
          <div className="bg-white rounded-lg border overflow-hidden relative pb-4">
             {/* Banner */}
             <div className="h-32 bg-[#a0b4b7]"></div>
             {/* Avatar */}
             <div className="absolute top-16 left-6 w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                <Users size={64} className="text-gray-400" />
             </div>
             
             <div className="mt-16 px-6">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Animesh Jain</h1>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0a66c2]" title="Open in new tab">
                     <ExternalLink size={20} />
                  </a>
                </div>
                <p className="text-gray-600">Full Stack Developer | React | Node.js | Cloud Architecture</p>
                <div className="text-gray-500 text-sm mt-1">San Francisco Bay Area · <span className="text-[#0a66c2] font-bold cursor-pointer">Contact info</span></div>
                <div className="text-[#0a66c2] font-bold text-sm mt-1">500+ connections</div>
                
                <div className="mt-4 flex gap-2">
                   <button className="bg-[#0a66c2] text-white font-bold py-1 px-4 rounded-full hover:bg-[#004182]">Open to</button>
                   <button className="border border-[#0a66c2] text-[#0a66c2] font-bold py-1 px-4 rounded-full hover:bg-blue-50">Add profile section</button>
                   <button className="border border-gray-600 text-gray-600 font-bold py-1 px-4 rounded-full hover:bg-gray-100">More</button>
                </div>
             </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-lg border p-6">
             <h2 className="text-xl font-bold mb-4">About</h2>
             <p className="text-sm leading-relaxed">
                Experienced Software Engineer with a passion for building scalable web applications and nostalgic interfaces. 
                Currently exploring the intersection of modern React patterns and classic design aesthetics.
                Always looking for new challenges in full-stack development.
             </p>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-lg border p-6">
             <h2 className="text-xl font-bold mb-4">Experience</h2>
             {/* Map Skills to "Experience" for mockup purposes */}
             {SKILLS.map((skill, i) => (
                <div key={i} className="flex gap-4 mb-6 border-b pb-4 last:border-0 last:pb-0">
                   <div className="w-12 h-12 bg-gray-100 flex items-center justify-center"><Briefcase size={24} className="text-gray-500" /></div>
                   <div>
                      <h3 className="font-bold">{skill.category} Developer</h3>
                      <p className="text-sm">Tech Corp Inc. · Full-time</p>
                      <p className="text-xs text-gray-500">Jan 2020 - Present · {5 - i} yrs</p>
                      <p className="text-sm mt-2">
                         Specializing in {skill.items.join(', ')}. Leading development teams and architectural decisions.
                      </p>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Sidebar */}
       <div className="w-72 hidden md:block space-y-4">
          <div className="bg-white rounded-lg border p-4">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-600">People also viewed</h3>
             </div>
             {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                   <div className="flex-1">
                      <div className="font-bold text-sm">Tech Recruiter {i}</div>
                      <div className="text-xs text-gray-500">Talent Acquisition at Big Tech</div>
                      <button className="mt-1 border border-gray-500 rounded-full px-3 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100">+ Connect</button>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

// --- Web Browser Component ---

const WebBrowser = ({ startUrl }) => {
  const [url, setUrl] = useState(startUrl);
  const [inputUrl, setInputUrl] = useState(startUrl);

  const handleNavigate = () => {
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http')) {
        finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
    setInputUrl(finalUrl);
  }
  
  const renderContent = () => {
    if (url.includes('github.com')) {
      return <GithubMock url={url} />;
    }
    if (url.includes('linkedin.com')) {
      return <LinkedinMock url={url} />;
    }
    
    // Default fallback for generic URLs
    return (
      <div className="flex-1 relative bg-white h-full">
         <iframe
            src={url}
            className="w-full h-full"
            title="Browser"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
         />
         {/* Helper overlay because X-Frame-Options exists */}
         <div className="absolute bottom-0 left-0 right-0 bg-yellow-100 border-t border-gray-400 p-1 text-xs text-center opacity-90">
            <span>Note: External site embedding is restricted by security policies. </span>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline font-bold">
              Click here to open in new tab
            </a>
         </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Toolbar */}
      <div className="flex flex-col gap-1 p-1 border-b-2 border-gray-400">
        <div className="flex gap-2 items-center">
             <span className="text-sm">Address:</span>
             <input
               className="flex-1 border-2 border-gray-400 border-b-white border-r-white bg-white px-1 font-sans text-sm h-6"
               value={inputUrl}
               onChange={(e) => setInputUrl(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
             />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-white border-2 border-gray-400 border-r-white border-b-white inset-shadow overflow-hidden">
         {renderContent()}
      </div>
    </div>
  );
};

// --- Window Component ---

const Window = ({ id, title, icon: Icon, children, onClose, onMinimize, isActive, onFocus, initialPos }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(initialPos || { x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    onFocus();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  // Add touch support
  const handleTouchStart = (e) => {
    if (isMaximized) return;
    onFocus();
    setIsDragging(true);
    const touch = e.touches[0];
    dragStart.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.current.x,
        y: touch.clientY - dragStart.current.y
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <div
      className={`absolute flex flex-col bg-gray-300 border-2 border-t-white border-l-white border-r-black border-b-black shadow-xl
        ${isMaximized ? 'inset-0 z-50 !transform-none !top-0 !left-0 !w-full !h-[calc(100%-40px)]' : ''}
      `}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : id === 'tetris' ? 'auto' : 'min(600px, 90vw)',
        height: isMaximized ? '100%' : 'auto',
        maxHeight: isMaximized ? '100%' : '80vh', // Constrain height to viewport height to ensure scrolling
        minHeight: '200px',
        zIndex: isActive ? 20 : 10,
        display: 'flex'
      }}
      onMouseDown={() => !isActive && onFocus()}
      onTouchStart={() => !isActive && onFocus()}
    >
      {/* Title Bar */}
      <div 
        className={`flex justify-between items-center p-1 cursor-default select-none
          ${isActive ? 'bg-[#000080]' : 'bg-gray-500'}
        `}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ touchAction: 'none' }} // Prevent scrolling while dragging
      >
        <div className="flex items-center gap-2 text-white font-bold px-1 truncate mr-4">
          {Icon && (
            typeof Icon === 'string' 
              ? <img src={Icon} alt="" className="w-4 h-4 object-contain" />
              : <Icon size={16} />
          )}
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-1">
          <WinButton small onClick={(e) => { e.stopPropagation(); onMinimize(); }}>
            <Minus size={12} strokeWidth={3} />
          </WinButton>
          <WinButton small onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}>
            <Maximize2 size={12} strokeWidth={3} />
          </WinButton>
          <WinButton small onClick={(e) => { e.stopPropagation(); onClose(); }}>
            <X size={12} strokeWidth={3} />
          </WinButton>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-auto p-1 bg-[#c0c0c0] border-2 border-t-black border-l-black border-r-white border-b-white font-sans text-sm`}>
        {children}
      </div>
    </div>
  );
};

// --- App Content Components ---

const NotepadContent = () => (
  <div className="font-mono text-base space-y-4 bg-white p-4 h-full">
    <p>Hi! I'm Animesh Jain, a Computer Science undergrad at Teerthanker Mahaveer University (Class of '27).</p>
    <p>
      I'm a Full-Stack Developer with a passion for AI/ML and retro tech. I love building real-time applications and exploring how old-school aesthetics meet modern performance.
    </p>
    <p className="mt-4">
      Currently working on:
      <br/>- Real-time WebSockets apps
      <br/>- Neural Style Transfer & NLP
      <br/>- Drinking too much coffee while debugging C++
    </p>
    <p className="mt-8">
      FEEL FREE TO EDIT THIS TEXT!
      <br/>
      (Just kidding, it's read-only for now, but you can drag this window around!)
    </p>
  </div>
);

const ExplorerContent = ({ onOpenProject }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 h-full">
    {PROJECTS.map((p) => (
      <div 
        key={p.id} 
        className="border-2 border-gray-200 p-3 hover:bg-blue-50 cursor-pointer group"
        onClick={() => onOpenProject(p.url, p.title)}
      >
        <div className="flex items-center gap-2 mb-2">
          <img src={WIN_ICONS.network} alt="" className="w-5 h-5" />
          <h3 className="font-bold text-blue-900 underline group-hover:text-blue-700">{p.title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-2">{p.desc}</p>
        <div className="flex flex-wrap gap-1">
          {p.stack.map(s => (
            <span key={s} className="bg-gray-200 text-xs px-1 border border-gray-400">{s}</span>
          ))}
        </div>
      </div>
    ))}
    <div className="col-span-1 md:col-span-2 mt-4 p-4 bg-yellow-50 border border-yellow-200 text-center">
      <p className="font-bold text-yellow-800">⚠️ Work in Progress</p>
      <p className="text-sm">More projects are being retrieved from the server tape drive...</p>
    </div>
  </div>
);

const SystemContent = () => (
  <div className="flex flex-col h-full bg-[#c0c0c0] p-4">
    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-300">
      <img src={WIN_ICONS.computer} alt="" className="w-12 h-12" />
      <div>
        <h2 className="text-xl font-bold">System Properties</h2>
        <p>Software Engineer v1.0</p>
        <p>Copyright © 2025</p>
      </div>
    </div>
    
    <div className="space-y-4">
      {SKILLS.map((skill) => (
        <div key={skill.category}>
          <h3 className="font-bold mb-1">{skill.category}:</h3>
          <div className="pl-4 grid grid-cols-2 gap-2">
            {skill.items.map(item => (
              <div key={item} className="flex items-center gap-2">
                <Cpu size={14} className="text-gray-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-auto pt-4 border-t border-gray-300 flex justify-end">
      <WinButton className="min-w-[80px]">OK</WinButton>
    </div>
  </div>
);

const MailContent = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('Collaboration Opportunity');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!fromEmail || !message) {
      alert("Please enter your email and a message.");
      return;
    }
    
    // REPLACE THIS WITH YOUR ACTUAL EMAIL ADDRESS
    const recipient = "janimesh936@gmail.com"; 
    
    // Construct the email body including the sender's stated email
    const body = `From: ${fromEmail}\n\n${message}`;
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Use an anchor tag to trigger the mailto link, which is often more reliable
    const link = document.createElement('a');
    link.href = mailtoLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = "janimesh936@gmail.com";
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Email address copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-full gap-2 bg-[#c0c0c0] p-2 text-sm">
      <div className="flex gap-2 items-center">
        <span className="w-16 text-right font-bold">To:</span> 
        <div className="flex-1 flex gap-2">
            <div className="bg-white border border-gray-400 px-2 py-1 flex-1 text-gray-500 select-all">janimesh936@gmail.com</div>
            <WinButton small onClick={copyToClipboard} title="Copy Email">Copy</WinButton>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <span className="w-16 text-right font-bold">From:</span> 
        <input 
          type="email" 
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="bg-white border border-gray-400 px-2 py-1 w-full outline-none focus:border-black font-sans"
        />
      </div>
      <div className="flex gap-2 items-center">
        <span className="w-16 text-right font-bold">Subject:</span> 
        <input 
          type="text" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-white border border-gray-400 px-2 py-1 w-full outline-none focus:border-black font-sans"
        />
      </div>
      <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 w-full border border-gray-400 p-2 resize-none font-mono outline-none focus:border-black mt-2"
        placeholder="Type your message here..."
      ></textarea>
      <div className="flex justify-end gap-2 mt-2">
         <div className="text-[10px] text-gray-600 self-center mr-auto max-w-[200px] leading-tight">
            *This will open your default email client. If it fails, please copy the email above.
         </div>
         <WinButton className="min-w-[80px]" onClick={handleSend}>Send</WinButton>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function Windows95Portfolio() {
  const [windows, setWindows] = useState([
    { id: 'welcome', title: 'Welcome', icon: WIN_ICONS.notepad, type: 'notepad', isOpen: true, isMinimized: false, zIndex: 10, pos: { x: 50, y: 50 }, content: <NotepadContent /> }
  ]);
  const [activeWindowId, setActiveWindowId] = useState('welcome');
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isBooted, setIsBooted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    setIsBooted(true);
    if (!isMuted) {
      const audio = new Audio(STARTUP_SOUND);
      audio.volume = 0.5; // Slightly lower volume
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const openWindow = (id, title, icon, type, payload = null) => {
    setStartOpen(false);
    
    // Check if already open
    const existing = windows.find(w => w.id === id);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      }
      setActiveWindowId(id);
      return;
    }

    // Determine content based on type/id
    let content;
    switch(type) {
      case 'notepad': content = <NotepadContent />; break;
      case 'explorer': content = <ExplorerContent onOpenProject={(url, projTitle) => openWindow(`browser-${projTitle}`, projTitle, WIN_ICONS.ie, 'browser', url)} />; break;
      case 'system': content = <SystemContent />; break;
      case 'mail': content = <MailContent />; break;
      case 'tetris': content = <Tetris />; break;
      case 'recycle': content = <div className="p-4 text-center">It's empty! (Like my coffee cup)</div>; break;
      case 'browser': 
        let startUrl = payload || 'https://www.google.com';
        if (id === 'github') startUrl = 'https://github.com/Mr-animesh';
        if (id === 'linkedin') startUrl = 'https://www.linkedin.com/in/animesh-jain936';
        content = <WebBrowser startUrl={startUrl} />; 
        break;
      case 'pdf': 
        content = <ResumeViewer />;
        break;
      default: content = <div>Content not found</div>;
    }

    const newWindow = {
      id,
      title,
      icon,
      type,
      content,
      isOpen: true,
      isMinimized: false,
      zIndex: Math.max(...windows.map(w => w.zIndex), 0) + 1,
      // Adjust initial position for smaller screens to ensure visibility
      pos: window.innerWidth < 640 ? { x: 10, y: 10 } : { x: 20 + (windows.length * 20), y: 20 + (windows.length * 20) }
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const focusWindow = (id) => {
    setActiveWindowId(id);
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  if (!isBooted) {
    return (
      <div className="h-[100dvh] w-screen bg-black flex flex-col items-center justify-center font-mono text-white select-none p-4">
        <div className="max-w-md w-full border-2 border-gray-600 bg-gray-800 p-8 shadow-2xl flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
             <img src={WIN_ICONS.winLogo} alt="Windows Logo" className="w-16 h-16 opacity-80" />
             <h1 className="text-2xl font-bold tracking-widest text-shadow">WINDOWS <span className="text-[#008080]">95</span></h1>
          </div>
          <div className="w-full h-px bg-gray-600"></div>
          <p className="text-center text-sm text-gray-300">
            Microsoft Windows 95<br/>
            © Copyright Microsoft Corp 1981-1995.
          </p>
          <button 
            onClick={handleStart}
            className="flex items-center gap-2 px-6 py-2 bg-gray-300 text-black font-bold border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white active:bg-gray-400 hover:bg-white transition-colors"
          >
            <Power size={18} />
            Start System
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-screen bg-[#008080] relative overflow-hidden font-sans select-none">
      
      {/* Desktop Area */}
      {/* Absolute positioning to ensure taskbar doesn't push content or get pushed */}
      <div className="absolute top-0 left-0 right-0 bottom-10 p-2 overflow-hidden" onClick={() => setStartOpen(false)}>
        <div className="flex flex-col flex-wrap content-start items-start h-full gap-4 w-full pb-8">
          {ICONS.map((icon) => (
            <div 
              key={icon.id}
              className="flex flex-col items-center gap-1 p-2 w-[80px] cursor-pointer group hover:bg-white/10 active:bg-blue-800/50 border border-transparent hover:border-white/20 active:border-blue-900 border-dotted mb-2 z-10"
              onDoubleClick={() => openWindow(icon.id, icon.label, icon.icon, icon.type)}
              // Add touch support for opening icons on mobile (tap)
              onTouchEnd={(e) => {
                  e.preventDefault(); // Prevent double-tap zoom if any
                  openWindow(icon.id, icon.label, icon.icon, icon.type);
              }}
            >
              <img src={icon.icon} alt={icon.label} className="w-8 h-8 object-contain drop-shadow-md pixelated" />
              <span className="text-white text-xs text-center drop-shadow-md bg-[#008080] group-hover:bg-blue-900 px-1 break-words w-full leading-tight">
                {icon.label}
              </span>
            </div>
          ))}
        </div>

        {/* Windows Layer */}
        {windows.map(w => (
          !w.isMinimized && (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              icon={w.icon}
              initialPos={w.pos}
              isActive={activeWindowId === w.id}
              onClose={() => closeWindow(w.id)}
              onMinimize={() => minimizeWindow(w.id)}
              onFocus={() => focusWindow(w.id)}
            >
              {w.content}
            </Window>
          )
        ))}

        {/* Clippy Helper */}
        <Clippy />
      </div>

      {/* Start Menu */}
      {startOpen && (
        <div className="absolute bottom-10 left-1 w-64 bg-gray-300 border-2 border-t-white border-l-white border-r-black border-b-black shadow-xl z-[100] flex">
          <div className="w-8 bg-[#000080] text-white flex items-end pb-2 justify-center">
            <span className="-rotate-90 whitespace-nowrap text-xl font-bold tracking-widest text-gray-300">WINDOWS <span className="text-white">95</span></span>
          </div>
          <div className="flex-1 py-1">
             {/* Projects */}
             <div className="hover:bg-[#000080] hover:text-white px-2 py-2 flex items-center gap-2 cursor-pointer border-b border-gray-400" onClick={() => openWindow('projects', 'My Projects', WIN_ICONS.folder, 'explorer')}>
               <img src={WIN_ICONS.folder} alt="" className="w-8 h-8" /> 
               <span className="underline">P</span>rojects
             </div>
             
             {/* GitHub */}
             <div className="hover:bg-[#000080] hover:text-white px-2 py-2 flex items-center gap-2 cursor-pointer border-b border-gray-400 group" onClick={() => openWindow('github', 'GitHub', WIN_ICONS.ie, 'browser')}>
               <Github size={24} className="text-black group-hover:text-white" />
               <span className="underline">G</span>itHub
             </div>

             {/* LinkedIn */}
             <div className="hover:bg-[#000080] hover:text-white px-2 py-2 flex items-center gap-2 cursor-pointer border-b border-gray-400 group" onClick={() => openWindow('linkedin', 'LinkedIn', WIN_ICONS.ie, 'browser')}>
               <Linkedin size={24} className="text-black group-hover:text-white" />
               <span className="underline">L</span>inkedIn
             </div>

             {/* Settings */}
             <div className="hover:bg-[#000080] hover:text-white px-2 py-2 flex items-center gap-2 cursor-pointer border-b border-gray-400" onClick={() => openWindow('skills', 'My Computer', WIN_ICONS.settings, 'system')}>
               <img src={WIN_ICONS.settings} alt="" className="w-8 h-8" />
               <span className="underline">S</span>ettings
             </div>

             {/* Shutdown */}
             <div className="hover:bg-[#000080] hover:text-white px-2 py-2 flex items-center gap-2 cursor-pointer border-t border-gray-400 mt-2" onClick={() => window.location.reload()}>
               <img src={WIN_ICONS.shutdown} alt="" className="w-8 h-8" />
               Shut Down...
             </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 w-full h-10 bg-gray-300 border-t-2 border-white flex items-center px-1 gap-1 shadow-md z-[100]">
        <WinButton 
          className="font-bold flex gap-1 px-2 py-1 items-center" 
          onClick={() => setStartOpen(!startOpen)}
          active={startOpen}
        >
          <img src={WIN_ICONS.winLogo} alt="logo" className="w-5 h-5 object-contain" />
          Start
        </WinButton>

        <div className="w-[2px] h-6 bg-gray-400 mx-1 border-r border-white"></div>

        {/* Taskbar Items */}
        <div className="flex-1 flex gap-1 overflow-x-auto no-scrollbar">
          {windows.map(w => (
            <WinButton
              key={w.id}
              className={`flex-1 max-w-[160px] truncate text-left justify-start gap-2 ${activeWindowId === w.id && !w.isMinimized ? 'font-bold bg-gray-200' : ''}`}
              active={activeWindowId === w.id && !w.isMinimized}
              onClick={() => {
                if (activeWindowId === w.id && !w.isMinimized) {
                  minimizeWindow(w.id);
                } else {
                  focusWindow(w.id);
                  setWindows(prev => prev.map(win => win.id === w.id ? { ...win, isMinimized: false } : win));
                }
              }}
            >
              {w.icon && (
                typeof w.icon === 'string'
                  ? <img src={w.icon} alt="" className="w-4 h-4" />
                  : <w.icon size={14} className="min-w-[14px]" />
              )}
              <span className="truncate text-sm">{w.title}</span>
            </WinButton>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 border-2 border-t-gray-500 border-l-gray-500 border-r-white border-b-white px-2 py-1 ml-2 bg-gray-300 inset-shadow shrink-0">
          <div className="flex gap-1 cursor-pointer" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </div>
          <span className="text-sm font-sans">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}