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

const COPY_LABEL = { idle: '複製', ok: '已複製', fail: '複製失敗' };

/** 複製鈕 icon 三態：剪貼簿／勾勾（成功）／警示三角（失敗）。
 *  失敗同時換 icon 與文案，不靠顏色單獨表意（WCAG 1.4.1）。 */
function CopyIcon({ state }) {
    if (state === 'ok') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        );
    }
    if (state === 'fail') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

export default function App() {
    const { pref, theme, cycle } = useTheme();
    const [text, setText] = useState('');
    const [copyState, setCopyState] = useState('idle'); // 'idle' | 'ok' | 'fail'
    const inputRef = useRef(null);
    const copiedTimer = useRef(null);

    const result = convertSentenceToI18n(text);

    const clear = () => {
        setText('');
        inputRef.current?.focus();
    };

    // 剪貼簿可能因 http 非安全來源、權限被拒或舊瀏覽器而失敗 →
    // 一定要給看得到的回饋（不要靜默失敗），並指出手動複製的替代路徑。
    const copy = async () => {
        if (!text) return;
        let state = 'ok';
        try {
            await navigator.clipboard.writeText(result);
        } catch {
            state = 'fail';
        }
        setCopyState(state);
        clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(
            () => setCopyState('idle'),
            state === 'ok' ? 1600 : 4000
        );
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
                        type="button"
                        className="clear-btn"
                        onClick={clear}
                        aria-label="清除輸入內容"
                        disabled={!text}
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
                        <span className="output-label" id="output-label">
                            轉換結果
                        </span>
                        <button
                            type="button"
                            className={`glass-chip copy-btn ${
                                copyState === 'ok' ? 'copied' : ''
                            } ${copyState === 'fail' ? 'failed' : ''}`}
                            onClick={copy}
                            disabled={!text}
                        >
                            <CopyIcon state={copyState} />
                            <span>{COPY_LABEL[copyState]}</span>
                        </button>
                    </div>
                    {/* 結果即時變動 → live region，螢幕閱讀器才會念出轉換後的字串。
                        polite：等使用者停下來才播報，不打斷打字。 */}
                    <div
                        className={`output-body ${text ? '' : 'empty'}`}
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        aria-labelledby="output-label"
                    >
                        {text ? result : PLACEHOLDER}
                    </div>
                    {copyState === 'fail' && (
                        <p className="copy-error animate-fade-in" role="alert">
                            無法存取剪貼簿（可能是瀏覽器權限或非安全連線），請手動選取上方文字複製。
                        </p>
                    )}
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
                <div style={{ marginTop: 6, fontSize: 11, color: 'var(--label-3)' }}>
                    a2o {typeof __GIT_SHA__ !== 'undefined' ? __GIT_SHA__ : 'dev'}
                </div>
            </footer>
        </main>
    );
}
