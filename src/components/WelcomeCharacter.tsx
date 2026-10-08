import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';
import { X, MessageCircle, ArrowRight, Sparkles, Volume2, VolumeX, Hand, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { burstConfetti } from '../lib/confetti';
import { auvieAudio } from '../lib/auvie-audio';

type Scene = {
  setVisible: (visible: boolean) => void;
  replay: (animate?: boolean) => void;
  playAction: (name: string, onDone?: () => void) => void;
  setLook: (xRatio: number, yRatio: number) => void;
  pause: () => void;
  rotate: (delta: number) => void;
  resetView: () => void;
  dispose: () => void;
};

type Factory = (host: HTMLDivElement, options: { signal: AbortSignal; onComplete: () => void; onError: () => void }) => Promise<Scene>;
let modulePromise: Promise<Factory> | undefined;

function loadScene() {
  if (!modulePromise) {
    modulePromise = new Promise<Factory>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/scene/welcome-scene.js';
      script.onload = () => {
        const factory = (window as Window & { auviaWelcomeScene?: Factory }).auviaWelcomeScene;
        factory ? resolve(factory) : reject(Error('Scene unavailable'));
      };
      script.onerror = () => {
        script.remove();
        reject(Error('Scene unavailable'));
      };
      document.head.appendChild(script);
    }).catch((error) => {
      modulePromise = undefined;
      throw error;
    });
  }
  return modulePromise;
}

type Option = { label: string; to: string };
const OPTIONS: Record<string, Option> = {
  form: { label: 'Start the interest form', to: '/#interest-form' },
  centers: { label: 'Find a center near me', to: '/locations' },
  insurance: { label: 'Check my insurance', to: '/insurance-financial-assistance' },
  states: { label: 'Plans accepted in my state', to: '/insurance-by-state' },
  services: { label: 'See therapy services', to: '/services' },
  autism: { label: 'Learn about autism', to: '/what-is-autism' },
  aba: { label: 'Learn about ABA therapy', to: '/what-is-aba' },
  guide: { label: 'Read the new family guide', to: '/parent-guide' },
  careers: { label: 'See careers at Auvia', to: '/careers' },
  team: { label: 'Talk to the care team', to: '/contact' },
};

const ROUTE_PROMPTS: [string, string[]][] = [
  ['/locations', ['team', 'insurance', 'services']],
  ['/insurance', ['states', 'insurance', 'team']],
  ['/services', ['centers', 'insurance', 'form']],
  ['/what-is-autism', ['aba', 'centers', 'team']],
  ['/what-is-aba', ['services', 'insurance', 'form']],
  ['/parent', ['autism', 'aba', 'guide']],
  ['/about', ['services', 'careers', 'team']],
  ['/careers', ['services', 'centers', 'team']],
  ['/contact', ['centers', 'insurance', 'services']],
  ['/', ['form', 'centers', 'insurance']],
];

const promptsSeen = new Set<string>();

function promptFor(pathname: string): Option[] {
  const keys = (pathname === '/' ? ROUTE_PROMPTS[ROUTE_PROMPTS.length - 1] : ROUTE_PROMPTS.find(([prefix]) => prefix !== '/' && pathname.startsWith(prefix)) ?? ['', ['centers', 'services', 'team']])[1];
  return keys.map((key) => OPTIONS[key]).filter((option) => option.to !== pathname);
}

function promptsMuted() {
  try {
    return sessionStorage.getItem('auvie-prompts-off') === '1';
  } catch {
    return false;
  }
}

interface WelcomeCharacterProps {
  onChat?: () => void;
  chatOpen?: boolean;
  chatAction?: string | null;
  onActionDone?: () => void;
}

export default function WelcomeCharacter({ onChat, chatOpen = false, chatAction = null, onActionDone }: WelcomeCharacterProps) {
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<Scene | null>(null);
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const pointer = useRef<{ id: number; x: number; y: number; lastX: number; dragged: boolean } | null>(null);

  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [hello, setHello] = useState(false);
  const { pathname } = useLocation();
  const [prompt, setPrompt] = useState<Option[] | null>(null);
  const chatOpenRef = useRef(chatOpen);
  chatOpenRef.current = chatOpen;
  const [failed, setFailed] = useState(false);
  const [intro, setIntro] = useState(() => !(window as Window & { auviaIntroShown?: boolean }).auviaIntroShown);
  const introRef = useRef(intro);
  introRef.current = intro;
  const stage = useRef<HTMLDivElement>(null);
  const previousBounds = useRef<DOMRect | null>(null);
  const travelAnimation = useRef<Animation | null>(null);

  // Interactive Mascot Enhancements
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showEmoteBar, setShowEmoteBar] = useState(false);
  const [soundOn, setSoundOn] = useState(() => auvieAudio.isEnabled());
  const toastTimeoutRef = useRef<number | null>(null);

  const triggerToast = useCallback((msg: string, duration = 3000) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, duration);
  }, []);

  const playEmote = useCallback((action: 'wave' | 'jump' | 'yes' | 'no' | 'duck', toastText: string, sound: 'chime' | 'cheer' | 'pop' = 'pop') => {
    setHello(false);
    setPrompt(null);
    triggerToast(toastText);

    if (sound === 'cheer') auvieAudio.playCheer();
    else if (sound === 'chime') auvieAudio.playChime();
    else auvieAudio.playPop();

    if (action === 'jump') {
      const rect = stage.current?.getBoundingClientRect();
      const originX = rect ? rect.left + rect.width / 2 : undefined;
      const originY = rect ? rect.top + rect.height / 2 : undefined;
      burstConfetti(originX, originY, 40);
    }

    if (scene.current) {
      scene.current.playAction(action, () => {
        onActionDone?.();
      });
    }
  }, [triggerToast, onActionDone]);

  // High-five action (click on Auvie)
  const triggerHighFive = useCallback(() => {
    const praises = [
      "High five! You're doing amazing! 🖐️✨",
      "Yay! Welcome to the Auvia family! 🎉",
      "Woohoo! Every milestone counts! 🌟",
      "High five! We're here for you! 💛",
    ];
    const quote = praises[Math.floor(Math.random() * praises.length)];
    playEmote('jump', quote, 'cheer');
  }, [playEmote]);

  // Respond to chat action requests (e.g. from chatbot)
  useEffect(() => {
    if (!chatAction || !scene.current) return;
    if (chatAction === 'jump') {
      playEmote('jump', "Yay! We're here to help! 🎉", 'cheer');
    } else if (chatAction === 'wave') {
      playEmote('wave', "Hello friend! 👋", 'chime');
    } else if (chatAction === 'yes') {
      playEmote('yes', "Yes! Let's find what you need. 👍", 'pop');
    } else if (chatAction === 'no') {
      playEmote('no', "Hmm, let me check for you! 💡", 'pop');
    } else {
      scene.current.playAction(chatAction, onActionDone);
    }
  }, [chatAction, playEmote, onActionDone]);

  useLayoutEffect(() => {
    const element = stage.current;
    if (!element) return;
    const next = element.getBoundingClientRect();
    const previous = previousBounds.current;
    travelAnimation.current?.cancel();
    if (previous && !reduced && !saveData) {
      travelAnimation.current = element.animate(
        [
          { transformOrigin: "0 0", transform: `translate(${previous.x - next.x}px, ${previous.y - next.y}px) scale(${previous.width / next.width}, ${previous.height / next.height})` },
          { transformOrigin: "0 0", transform: "none" }
        ],
        { duration: 850, easing: "cubic-bezier(.22,1,.36,1)" }
      );
    }
    previousBounds.current = next;
    return () => travelAnimation.current?.cancel();
  }, [intro, chatOpen, reduced, saveData]);

  useEffect(() => {
    if (!intro) return;
    const timer = window.setTimeout(() => {
      setIntro(false);
      setHello(false);
      (window as Window & { auviaIntroShown?: boolean }).auviaIntroShown = true;
    }, 3000);
    return () => clearTimeout(timer);
  }, [intro]);

  useEffect(() => {
    if (chatOpen) {
      setIntro(false);
      setHello(false);
      setPrompt(null);
      // Keep scene alive so Auvie can react beside chat!
      scene.current?.setVisible(true);
    }
  }, [chatOpen]);

  // Five seconds into a page, Auvie offers that page's most likely next steps.
  useEffect(() => {
    setPrompt(null);
    if (promptsSeen.has(pathname) || promptsMuted()) return;
    const timer = window.setTimeout(() => {
      const busy = introRef.current || chatOpenRef.current || document.querySelector("dialog[open], [aria-label='Navigation menu']") || document.activeElement?.closest('input, textarea, select, [contenteditable]');
      if (busy || promptsMuted()) return;
      promptsSeen.add(pathname);
      setHello(false);
      setPrompt(promptFor(pathname));
    }, 5000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // The bubble steps aside once the visitor starts reading further down the page.
  useEffect(() => {
    if (!prompt) return;
    const start = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - start) > 360) setPrompt(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prompt]);

  const mutePrompts = () => {
    setPrompt(null);
    try {
      sessionStorage.setItem('auvie-prompts-off', '1');
    } catch {
      // Storage unavailable
    }
  };

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced === false && !connection?.saveData) {
      setRequested(true);
    } else {
      setRequested(false);
      setReady(false);
    }
  }, [reduced]);

  useEffect(() => {
    if (!requested || !host.current) return;
    let mounted = true;
    const abort = new AbortController();
    const timeout = window.setTimeout(() => abort.abort(), 20000);

    loadScene()
      .then((factory) =>
        mounted && host.current
          ? factory(host.current, {
              signal: abort.signal,
              onComplete: () => {},
              onError: () => {
                if (mounted) {
                  setFailed(true);
                  setReady(false);
                  scene.current?.dispose();
                  scene.current = null;
                }
              }
            })
          : null
      )
      .then((controller) => {
        clearTimeout(timeout);
        if (!controller) return;
        if (!mounted) {
          controller.dispose();
          return;
        }
        scene.current = controller;
        setReady(true);
        controller.setVisible(!document.hidden);
        controller.replay(introRef.current && !reducedRef.current);
      })
      .catch(() => {
        if (mounted) setFailed(true);
      });

    const visibility = () => scene.current?.setVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      abort.abort();
      document.removeEventListener('visibilitychange', visibility);
      scene.current?.dispose();
      scene.current = null;
    };
  }, [requested]);

  useEffect(() => {
    if (reduced) scene.current?.replay(false);
  }, [reduced]);

  const toggleSound = () => {
    const next = !soundOn;
    auvieAudio.setEnabled(next);
    setSoundOn(next);
    triggerToast(next ? "Sound on! 🔊 Chimes enabled" : "Sound muted 🔇", 2000);
  };

  return (
    <>
      {intro && !chatOpen && (
        <div
          className="auvia-character__intro-backdrop"
          aria-hidden="true"
          onClick={() => {
            setIntro(false);
            setHello(false);
            (window as Window & { auviaIntroShown?: boolean }).auviaIntroShown = true;
          }}
          title="Click to continue"
        />
      )}
      <aside
        className="auvia-character"
        data-intro={intro && !chatOpen}
        data-chat-open={chatOpen}
        aria-label="Auvie assistant"
      >
        {intro && (
          <div className="auvia-character__intro-title" role="status">
            <strong>Hi! I'm Auvie.</strong>
            <span>Welcome to Auvia</span>
            <button
              type="button"
              className="auvia-character__intro-skip"
              onClick={() => {
                setIntro(false);
                setHello(false);
                (window as Window & { auviaIntroShown?: boolean }).auviaIntroShown = true;
              }}
            >
              Skip hello
            </button>
          </div>
        )}

      {/* Interactive Celebration Toast Bubble */}
      {toastMessage && !intro && !chatOpen && (
        <div
          className="auvia-character__toast"
          role="status"
          aria-live="polite"
          onClick={() => setToastMessage(null)}
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            className="auvia-character__toast-close"
            onClick={(e) => {
              e.stopPropagation();
              setToastMessage(null);
            }}
            aria-label="Close message"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Suggested Next Steps Prompt */}
      {prompt && !hello && !intro && !chatOpen && !toastMessage && (
        <div
          className="auvia-character__hello auvia-character__hello--prompt"
          role="region"
          aria-label="Auvie suggestions"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              mutePrompts();
              stage.current?.focus();
            }
          }}
        >
          <button className="auvia-character__close" type="button" aria-label="Dismiss suggestions" onClick={mutePrompts}>
            <X size={16} />
          </button>
          <strong>Hi! Looking for something?</strong>
          <nav className="auvia-character__options" aria-label="Suggested pages">
            {prompt.map((option) => (
              <Link key={option.to} to={option.to} onClick={() => setPrompt(null)}>
                {option.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="auvia-character__care"
            onClick={() => {
              setPrompt(null);
              onChat?.();
            }}
          >
            Or ask Auvie
          </button>
        </div>
      )}

      {/* Interactive Greeting & Help Window */}
      {hello && !intro && !chatOpen && !toastMessage && (
        <div
          className="auvia-character__hello"
          role="region"
          aria-label="Auvie greeting"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setHello(false);
              stage.current?.focus();
            }
          }}
        >
          <button
            className="auvia-character__close"
            type="button"
            aria-label="Dismiss greeting"
            onClick={() => {
              setHello(false);
              stage.current?.focus({ preventScroll: true });
            }}
          >
            <X size={16} />
          </button>
          <strong>Hi! I'm Auvie.</strong>
          <p>How can I help you today?</p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="auvia-character__chat"
              onClick={() => {
                setHello(false);
                onChat?.();
              }}
            >
              <MessageCircle size={16} /> Let's chat
            </button>
            <button
              type="button"
              className="auvia-character__emote-quick"
              onClick={triggerHighFive}
            >
              <Hand size={15} /> Give High-Five!
            </button>
            <Link className="auvia-character__care" to="/contact" onClick={() => setHello(false)}>
              Talk to the care team
            </Link>
          </div>
        </div>
      )}

      {/* 3D Mascot Character Stage */}
      <div
        ref={stage}
        className="auvia-character__stage"
        role="button"
        tabIndex={chatOpen ? -1 : 0}
        aria-label="Say hi to Auvie, or click for high-five!"
        aria-expanded={hello && !intro && !chatOpen}
        aria-describedby="auvie-controls"
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            triggerHighFive();
          }
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            scene.current?.rotate(event.key === 'ArrowLeft' ? -0.25 : 0.25);
          }
          if (event.key === 'Home') {
            event.preventDefault();
            scene.current?.resetView();
          }
          if (event.key === 'Escape') {
            setHello(false);
            setShowEmoteBar(false);
          }
        }}
        onPointerDown={(event) => {
          if (event.button === 0) {
            pointer.current = {
              id: event.pointerId,
              x: event.clientX,
              y: event.clientY,
              lastX: event.clientX,
              dragged: false
            };
          }
        }}
        onPointerMove={(event) => {
          const drag = pointer.current;
          if (!drag || drag.id !== event.pointerId || !ready) return;
          const dx = event.clientX - drag.x;
          const dy = event.clientY - drag.y;
          if (!drag.dragged && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
            drag.dragged = true;
            (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
          }
          if (drag.dragged) {
            scene.current?.rotate((event.clientX - drag.lastX) * 0.012);
            drag.lastX = event.clientX;
          }
        }}
        onPointerUp={(event) => {
          const drag = pointer.current;
          pointer.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          if (drag?.id === event.pointerId && !drag.dragged && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 8) {
            triggerHighFive();
          }
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onLostPointerCapture={() => {
          pointer.current = null;
        }}
      >
        {!ready && <img src="/models/auvie-poster.png" alt="" className="auvia-character__poster" />}
        <div ref={host} className="auvia-character__canvas" data-ready={ready} aria-hidden="true" />
      </div>

      {/* Interactive Emote Tray */}
      {showEmoteBar && !intro && !chatOpen && (
        <div className="auvia-character__emote-dock" role="toolbar" aria-label="Auvie emotions and actions">
          <button
            type="button"
            title="High Five!"
            aria-label="High Five"
            onClick={triggerHighFive}
            className="auvia-character__emote-btn auvia-character__emote-btn--coral"
          >
            <Hand size={16} />
            <span className="sr-only">High Five</span>
          </button>
          <button
            type="button"
            title="Wave"
            aria-label="Wave"
            onClick={() => playEmote('wave', "Hi there! Welcome to Auvia! 👋", 'chime')}
            className="auvia-character__emote-btn auvia-character__emote-btn--yellow"
          >
            👋
          </button>
          <button
            type="button"
            title="Cheer & Confetti"
            aria-label="Cheer"
            onClick={() => playEmote('jump', "Woohoo! Keep shining! 🎉✨", 'cheer')}
            className="auvia-character__emote-btn auvia-character__emote-btn--teal"
          >
            🎉
          </button>
          <button
            type="button"
            title="Nod Yes"
            aria-label="Nod Yes"
            onClick={() => playEmote('yes', "Yes! We're here for you every step. 👍", 'pop')}
            className="auvia-character__emote-btn"
          >
            👍
          </button>
          <button
            type="button"
            title="Peek-a-boo"
            aria-label="Peek"
            onClick={() => playEmote('duck', "Peek-a-boo! Play is how we learn! 🎈", 'pop')}
            className="auvia-character__emote-btn"
          >
            🙈
          </button>
          <button
            type="button"
            title={soundOn ? "Mute sounds" : "Enable sound effects"}
            aria-label={soundOn ? "Mute sounds" : "Enable sound effects"}
            onClick={toggleSound}
            className={`auvia-character__emote-btn ${soundOn ? 'auvia-character__emote-btn--active' : ''}`}
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      )}

      {/* Bottom Action Buttons */}
      {!intro && !chatOpen && (
        <div className="auvia-character__actions">
          <button type="button" onClick={onChat} aria-label="Open chat with Auvie">
            <MessageCircle size={15} aria-hidden="true" />
            Chat
          </button>
          <button
            type="button"
            onClick={() => setShowEmoteBar(!showEmoteBar)}
            aria-label={showEmoteBar ? "Close play actions" : "Play with Auvie"}
            className="auvia-character__play-btn"
            title="Play with Auvie"
          >
            <Sparkles size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      <span id="auvie-controls" className="sr-only">
        Click for high-five and celebration. Drag sideways or use arrow keys to turn. Home resets the view.
      </span>
    </aside>
  </>
);
}

