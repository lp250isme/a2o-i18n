import { useRef, useState } from 'react';
import { LiquidGlass } from 'liquid-glass-kit';
import { MoreByKv } from 'more-by-kv';
import useTheme from './useTheme';
import { convertSentenceToI18n } from './i7h';

const SAMPLES = [
    'Internationalization is hard',
    'The quick brown fox jumps over the lazy dog',
    'Localization & Accessibility',
];

const PLACEHOLDER = '轉換結果會即時顯示在這裡';

function ThemeIcon({ pref }) {
    if (pref === 'light') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
        );
    }
    if (pref === 'dark') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
        </svg>
    );
}

export default function App() {
    const { pref, theme, cycle } = useTheme();
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);
    const copiedTimer = useRef(null);

    const result = convertSentenceToI18n(text);

    const clear = () => {
        setText('');
        inputRef.current?.focus();
    };

    const copy = async () => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(result);
        } catch {
            return; // 剪貼簿不可用時靜默失敗
        }
        setCopied(true);
        clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopied(false), 1600);
    };

    return (
        <main className="page">
            <header className="topbar animate-fade-in">
                <img
                    src={theme === 'dark' ? '/icon-dark.png' : '/icon.png'}
                    alt="a2o-i18n"
                />
                <button
                    className="glass icon-btn"
                    onClick={cycle}
                    aria-label="切換主題"
                >
                    <ThemeIcon pref={pref} />
                </button>
            </header>

            <section className="hero animate-fade-in">
                <h1>i18n 縮寫產生器</h1>
                <p>
                    把每個單字壓縮成「首字母 + 中間字母數 +
                    尾字母」——就像 Internationalization 因為中間有 18
                    個字母而簡寫成 i18n，讓你完全看不懂。
                </p>
                <div className="demo-strip glass-chip">
                    <span className="word">
                        <b>I</b>
                        <span className="mid">nternationalizatio</span>
                        <b>n</b>
                    </span>
                    <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                    <span className="badge">I18n</span>
                </div>
            </section>

            <section className="card-stack">
                <LiquidGlass
                    radius={28}
                    frost={0.08}
                    className={`input-card animate-fade-in ${text ? 'has-text' : ''}`}
                >
                    <textarea
                        ref={inputRef}
                        rows={4}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="在此輸入任意句子…"
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <button
                        className="clear-btn"
                        onClick={clear}
                        aria-label="清除"
                        tabIndex={-1}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </LiquidGlass>

                <div className="chips animate-fade-in">
                    {SAMPLES.map(s => (
                        <button
                            key={s}
                            className="glass-chip chip"
                            onClick={() => setText(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="glass-panel output-card animate-fade-in">
                    <div className="output-head">
                        <span className="output-label">轉換結果</span>
                        <button
                            className={`glass-chip copy-btn ${copied ? 'copied' : ''}`}
                            onClick={copy}
                            disabled={!text}
                        >
                            {copied ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            )}
                            <span>{copied ? '已複製' : '複製'}</span>
                        </button>
                    </div>
                    <div className={`output-body ${text ? '' : 'empty'}`}>
                        {text ? result : PLACEHOLDER}
                    </div>
                </div>
            </section>

            {/* 跨作品互推 — 註冊表在 more-by-kv，更新一處全 app 跟上 */}
            <MoreByKv
                exclude={['a2o']}
                lang="zh"
                theme={theme}
                className="more-by animate-fade-in"
            />

            <footer className="animate-fade-in">
                靈感來自{' '}
                <a href="https://github.com/RimoChan/i7h" target="_blank" rel="noopener noreferrer">
                    RimoChan/i7h
                </a>{' '}
                ·{' '}
                <a href="https://github.com/lp250isme/a2o-i18n" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
            </footer>
        </main>
    );
}
