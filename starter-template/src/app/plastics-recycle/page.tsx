'use client'; // <-- Required for using hooks like useState and useEffect

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Type Definitions ---
interface Translation {
    mainTitle: string;
    subtitle: string;
    scoreLabel: string;
    correctLabel: string;
    wrongItemsLabel: string;
    welcomeTitle: string;
    welcomeText: string;
    guideTitle: string;
    easyRecycle: string;
    easyExamples: string;
    checkLocal: string;
    localExamples: string;
    specialDrop: string;
    dropExamples: string;
    startButton: string;
    questionText: string;
    plasticHint: string;
    yesButton: string;
    noButton: string;
    resultsTitle: string;
    finalScore: string;
    playAgainButton: string;
    learnMoreButton: string;
    correctFeedback: string;
    incorrectFeedback: string;
    recyclingTips?: string;
    alwaysRecyclable?: string;
    waterBottles?: string;
    milkJugs?: string;
    neverRecyclable?: string;
    plasticBags?: string;
    whenInDoubt?: string;
}

interface PlasticItem {
    id: number;
    name: string;
    image: string; // SVG data URL
    recyclable: boolean;
    category: string;
}

type LanguageKey = 'en' | 'ja' | 'zh' ;

interface GameState {
    score: number;
    correctAnswers: number;
    wrongItemsCount: number;
    currentQuestionIndex: number;
    showScreen: 'welcome' | 'game' | 'results';
    feedback: {
        message: string;
        type: 'correct' | 'incorrect' | null;
    };
}

// --- Data ---
const CORE_TRANSLATIONS = {
    en: {
        mainTitle: "🕵️ Plastic Detective",
        subtitle: "Can it be recycled? You decide!",
        scoreLabel: "Score",
        correctLabel: "Correct",
        wrongItemsLabel: "Wrong Items",
        welcomeTitle: "Welcome to Plastic Detective!",
        welcomeText: "Look at each plastic item and decide if it can be recycled curbside or not.",
        guideTitle: "Quick Recycling Guide:",
        easyRecycle: "Easy to Recycle (✓):",
        easyExamples: "#1 PET (water bottles), #2 HDPE (milk jugs)",
        checkLocal: "Check Locally (?):",
        localExamples: "#3 PVC, #5 PP, #6 PS - Call your recycling program",
        specialDrop: "Special Drop-off:",
        dropExamples: "#4 LDPE (plastic bags) - Take to grocery stores",
        startButton: "Start Game",
        questionText: "Can this be recycled curbside?",
        plasticHint: "Hint: Check the recycling symbol",
        yesButton: "✓ YES - Recyclable",
        noButton: "✗ NO - Not Recyclable",
        resultsTitle: "🎉 Great Job, Recycling Champion!",
        finalScore: "Final Score",
        playAgainButton: "Play Again",
        learnMoreButton: "Learn More",
        correctFeedback: "Correct!",
        incorrectFeedback: "Not quite!",
        recyclingTips: "Recycling Tips",
        alwaysRecyclable: "ALWAYS recyclable curbside",
        waterBottles: "Water bottles",
        milkJugs: "Milk jugs",
        neverRecyclable: "Check locally",
        plasticBags: "Plastic bags",
        whenInDoubt: "When in doubt, check locally"
    },
    ja: {
        mainTitle: "🕵️ プラスチック探偵",
        subtitle: "リサイクルできますか？あなたが決めて！",
        scoreLabel: "スコア",
        correctLabel: "正解",
        wrongItemsLabel: "間違ったアイテム",
        welcomeTitle: "プラスチック探偵へようこそ！",
        welcomeText: "各プラスチック製品を見て、道端でリサイクルできるかどうかを決めてください。",
        guideTitle: "クイックリサイクルガイド：",
        easyRecycle: "簡単にリサイクル（✓）：",
        easyExamples: "#1 PET（水ボトル）、#2 HDPE（牛乳パック）",
        checkLocal: "地元で確認（？）：",
        localExamples: "#3 PVC、#5 PP、#6 PS - リサイクルプログラムに電話",
        specialDrop: "特別な回収：",
        dropExamples: "#4 LDPE（ビニール袋）- 食料品店に持参",
        startButton: "ゲーム開始",
        questionText: "これは道端でリサイクルできますか？",
        plasticHint: "ヒント：リサイクルシンボルを確認",
        yesButton: "✓ はい - リサイクル可能",
        noButton: "✗ いいえ - リサイクル不可",
        resultsTitle: "🎉 お疲れ様、リサイクルチャンピオン！",
        finalScore: "最終スコア",
        playAgainButton: "もう一度プレイ",
        learnMoreButton: "詳細を学ぶ",
        correctFeedback: "正解！",
        incorrectFeedback: "正確ではありません！"
    },
    zh: {
        mainTitle: "🕵️ 塑料侦探",
        subtitle: "可以回收吗？你来决定！",
        scoreLabel: "得分",
        correctLabel: "正确",
        wrongItemsLabel: "错误物品",
        welcomeTitle: "欢迎来到塑料侦探！",
        welcomeText: "查看每个塑料制品，决定它是否可以在路边回收。",
        guideTitle: "快速回收指南：",
        easyRecycle: "易于回收（✓）：",
        easyExamples: "#1 PET（水瓶）、#2 HDPE（牛奶罐）",
        checkLocal: "本地查询（？）：",
        localExamples: "#3 PVC、#5 PP、#6 PS - 致电回收计划",
        specialDrop: "特殊投放：",
        dropExamples: "#4 LDPE（塑料袋）- 带到杂货店",
        startButton: "开始游戏",
        questionText: "这个可以在路边回收吗？",
        plasticHint: "提示：检查回收标志",
        yesButton: "✓ 是 - 可回收",
        noButton: "✗ 否 - 不可回收",
        resultsTitle: "🎉 干得好，回收冠军！",
        finalScore: "最终得分",
        playAgainButton: "再玩一次",
        learnMoreButton: "了解更多",
        correctFeedback: "正确！",
        incorrectFeedback: "不完全正确！"
    },
};

const ALL_TRANSLATIONS: Record<LanguageKey, Translation> = {
    ...CORE_TRANSLATIONS,
    es: CORE_TRANSLATIONS.en, 
    fr: CORE_TRANSLATIONS.en, 
} as Record<LanguageKey, Translation>;

const PLASTIC_ITEMS: PlasticItem[] = [
    {
        id: 1,
        name: "Water Bottle",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect x='60' y='40' width='80' height='120' rx='10' fill='%234CAF50' opacity='0.8'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3E%E2%99%BB%EF%B8%8F1%3C/text%3E%3C/svg%3E",
        recyclable: true,
        category: "PET #1"
    },
    {
        id: 2,
        name: "Plastic Bag",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M50 80 L50 140 L150 140 L150 80 Z' fill='%239C27B0' opacity='0.6' stroke='%239C27B0' stroke-width='2'/%3E%3Ctext x='100' y='115' text-anchor='middle' fill='white' font-size='20' font-weight='bold'%3E%E2%99%BB%EF%B8%8F4%3C/text%3E%3C/svg%3E",
        recyclable: false,
        category: "LDPE #4" // Not curbside
    },
    {
        id: 3,
        name: "Milk Jug",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect x='50' y='60' width='100' height='80' rx='15' fill='%232196F3' opacity='0.8'/%3E%3Ctext x='100' y='105' text-anchor='middle' fill='white' font-size='20' font-weight='bold'%3E%E2%99%BB%EF%B8%8F2%3C/text%3E%3C/svg%3E",
        recyclable: true,
        category: "HDPE #2"
    }
];

const INITIAL_GAME_STATE: GameState = {
    score: 0,
    correctAnswers: 0,
    wrongItemsCount: 0,
    currentQuestionIndex: 0,
    showScreen: 'welcome',
    feedback: { message: '', type: null },
};

// --- Styles (Adapted from the <style> block) ---
const styles = {
    body: (lang: LanguageKey) => ({
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        overflow: 'hidden',
        ...(lang === 'ja' && { fontSize: '0.95em' }),
        ...(lang === 'zh' && { fontSize: '0.98em' }),
    }),
    appContainer: {
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1024px',
        height: '100vh',
        maxHeight: '1366px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    header: {
        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        color: 'white',
        padding: '30px',
        textAlign: 'center' as const,
        position: 'relative' as const,
        flexShrink: 0,
    },
    headerH1: (lang: LanguageKey) => ({
        fontSize: lang === 'ja' ? '2.2em' : lang === 'zh' ? '2.4em' : '2.5em',
        marginBottom: '10px',
    }),
    languageSelector: {
        position: 'absolute' as const,
        top: '20px',
        right: '20px',
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '20px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '1em',
    },
    scoreBoard: {
        display: 'flex',
        justifyContent: 'space-around',
        background: '#f5f5f5',
        padding: '20px',
        borderBottom: '2px solid #ddd',
        flexShrink: 0,
    },
    scoreItem: {
        textAlign: 'center' as const,
    },
    scoreItemLabel: {
        fontSize: '1.1em',
        color: '#666',
        marginBottom: '5px',
    },
    scoreValue: {
        fontSize: '2em',
        fontWeight: 'bold' as const,
        color: '#4CAF50',
    },
    gameArea: {
        padding: '30px',
        textAlign: 'center' as const,
        flex: 1,
        overflowY: 'auto' as const,
    },
    plasticImageContainer: {
        background: '#f9f9f9',
        border: '3px solid #ddd',
        borderRadius: '15px',
        padding: '20px',
        margin: '20px auto',
        maxWidth: '400px',
    },
    plasticImage: {
        width: '100%',
        height: '250px',
        objectFit: 'contain' as const,
        borderRadius: '10px',
        background: 'white',
        border: '2px solid #eee',
    },
    plasticHint: {
        marginTop: '15px',
        fontSize: '1.1em',
        color: '#666',
        fontStyle: 'italic' as const,
    },
    recycleButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        margin: '30px 0',
    },
    recycleButton: {
        padding: '15px 40px',
        fontSize: '1.2em',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: 'bold' as const,
    },
    recycleYes: {
        background: '#4CAF50',
        color: 'white',
    },
    recycleNo: {
        background: '#f44336',
        color: 'white',
    },
    feedback: (type: 'correct' | 'incorrect' | null) => ({
        margin: '20px 0',
        padding: '15px',
        borderRadius: '10px',
        fontSize: '1.1em',
        fontWeight: 'bold' as const,
        ...(type === 'correct' && {
            background: '#e8f5e9',
            color: '#2e7d32',
            border: '2px solid #4CAF50',
        }),
        ...(type === 'incorrect' && {
            background: '#ffebee',
            color: '#c62828',
            border: '2px solid #f44336',
        }),
    }),
    plasticGuide: {
        background: '#e3f2fd',
        border: '2px solid #2196F3',
        borderRadius: '15px',
        padding: '20px',
        margin: '20px 0',
        textAlign: 'left' as const,
        // ✅ FIX 1: Set the main text color inside the guide to black/dark gray
        color: '#333',
    },
    plasticGuideH4: {
        // ✅ FIX 2: Set the title color to black/dark gray for better contrast
        color: '#333', 
        marginBottom: '15px',
    },
    recyclingTip: {
        margin: '10px 0',
        padding: '10px',
        background: '#f8f9fa',
        borderLeft: '4px solid #4CAF50',
    },
};

// --- Component ---
// FIX: Export the functional component directly as the default export
export default function PlasticDetective() {
    const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
    const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>('en');

    const t = useMemo(() => ALL_TRANSLATIONS[currentLanguage] || ALL_TRANSLATIONS['en'], [currentLanguage]);
    const currentItem = PLASTIC_ITEMS[gameState.currentQuestionIndex];
    const { feedback } = gameState;


    // --- Game Logic ---

    const startGame = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            showScreen: 'game',
            feedback: { message: '', type: null },
        }));
    }, []);

    const playAgain = useCallback(() => {
        setGameState(INITIAL_GAME_STATE);
    }, []);

    const learnMore = useCallback(() => {
        alert("💡 " + (t.recyclingTips || "Recycling Tips") + ":\n\n" +
            "✅ " + (t.alwaysRecyclable || "ALWAYS recyclable curbside") + ":\n" +
            "- #1 PET: " + (t.waterBottles || "Water bottles") + "\n" +
            "- #2 HDPE: " + (t.milkJugs || "Milk jugs") + "\n\n" +
            "❌ " + (t.neverRecyclable || "Check locally") + ":\n" +
            "- #4 LDPE: " + (t.plasticBags || "Plastic bags") + "\n\n" +
            (t.whenInDoubt || "When in doubt, check locally") + "!"
        );
    }, [t]);

    const answerRecycle = useCallback((userAnswer: boolean) => {
        if (!currentItem) return;

        const isCorrect = userAnswer === currentItem.recyclable;
        let newFeedback: GameState['feedback'];
        let scoreChange = 0;
        let correctChange = 0;
        let wrongChange = 0;

        if (isCorrect) {
            scoreChange = 10;
            correctChange = 1;
            newFeedback = {
                type: 'correct',
                message: `✓ ${t.correctFeedback} ${currentItem.name} (${currentItem.category}) ${currentItem.recyclable ? 'can be recycled!' : 'cannot be recycled curbside.'}`
            };
        } else {
            wrongChange = 1;
            newFeedback = {
                type: 'incorrect',
                message: `✗ ${t.incorrectFeedback} ${currentItem.name} (${currentItem.category}) ${currentItem.recyclable ? 'can be recycled!' : 'cannot be recycled curbside.'}`
            };
        }

        setGameState(prev => ({
            ...prev,
            score: prev.score + scoreChange,
            correctAnswers: prev.correctAnswers + correctChange,
            wrongItemsCount: prev.wrongItemsCount + wrongChange,
            feedback: newFeedback,
        }));

        setTimeout(() => {
            setGameState(prev => {
                const nextIndex = prev.currentQuestionIndex + 1;
                if (nextIndex >= PLASTIC_ITEMS.length) {
                    return {
                        ...prev,
                        showScreen: 'results',
                        feedback: { message: '', type: null },
                    };
                }
                return {
                    ...prev,
                    currentQuestionIndex: nextIndex,
                    feedback: { message: '', type: null },
                };
            });
        }, 2000); // Wait 2 seconds before moving to the next question/end screen
    }, [currentItem, t]);

    // --- Render Logic (Screens) ---

    const WelcomeScreen = (
        <div id="welcomeScreen">
            <h2 style={{ fontSize: '1.8em', marginBottom: '15px' }}>{t.welcomeTitle}</h2>
            <p style={{ marginBottom: '25px' }}>{t.welcomeText}</p>

            <div style={styles.plasticGuide}>
                <h4 style={styles.plasticGuideH4}>{t.guideTitle}</h4>
                <div style={styles.recyclingTip}>
                    <strong>{t.easyRecycle}</strong> <span>{t.easyExamples}</span>
                </div>
                <div style={styles.recyclingTip}>
                    <strong>{t.checkLocal}</strong> <span>{t.localExamples}</span>
                </div>
                <div style={styles.recyclingTip}>
                    <strong>{t.specialDrop}</strong> <span>{t.dropExamples}</span>
                </div>
            </div>

            <button
                style={{ ...styles.recycleButton, ...styles.recycleYes }}
                onClick={startGame}
            >
                {t.startButton}
            </button>
        </div>
    );

    const GameScreen = currentItem && (
        <div id="gameScreen">
            <h2 style={{ fontSize: '1.8em', marginBottom: '20px' }}>{t.questionText}</h2>

            <div style={styles.plasticImageContainer}>
                <img
                    style={styles.plasticImage}
                    src={currentItem.image}
                    alt={currentItem.name}
                />
                <div style={styles.plasticHint}>{t.plasticHint}: {currentItem.category}</div>
            </div>

            <div style={styles.recycleButtons}>
                <button
                    style={{ ...styles.recycleButton, ...styles.recycleYes }}
                    onClick={() => answerRecycle(true)}
                    disabled={!!feedback.type} // Disable buttons during feedback
                >
                    {t.yesButton}
                </button>
                <button
                    style={{ ...styles.recycleButton, ...styles.recycleNo }}
                    onClick={() => answerRecycle(false)}
                    disabled={!!feedback.type} // Disable buttons during feedback
                >
                    {t.noButton}
                </button>
            </div>

            {feedback.type && (
                <div style={styles.feedback(feedback.type as 'correct' | 'incorrect')}>
                    {feedback.message}
                </div>
            )}
        </div>
    );

    const ResultsScreen = (
        <div id="resultsScreen">
            <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>{t.resultsTitle}</h2>
            <div style={styles.scoreItem}>
                <div style={styles.scoreItemLabel}>{t.finalScore}</div>
                <div style={styles.scoreValue}>{gameState.score}</div>
            </div>
            <div style={{ ...styles.recycleButtons, flexDirection: 'column', alignItems: 'center' }}>
                <button
                    style={{ ...styles.recycleButton, ...styles.recycleYes, width: '200px', marginBottom: '15px' }}
                    onClick={playAgain}
                >
                    {t.playAgainButton}
                </button>
                <button
                    style={{ ...styles.recycleButton, background: '#2196F3', width: '200px' }}
                    onClick={learnMore}
                >
                    {t.learnMoreButton}
                </button>
            </div>
        </div>
    );

    // --- Main Render ---

    return (
        <div style={styles.body(currentLanguage)}>
            <div style={styles.appContainer}>
                {/* Header */}
                <div style={styles.header}>
                    <select
                        style={styles.languageSelector}
                        value={currentLanguage}
                        onChange={(e) => setCurrentLanguage(e.target.value as LanguageKey)}
                    >
                        {Object.keys(ALL_TRANSLATIONS).map(lang => (
                            <option key={lang} value={lang}>
                                {lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'fr' ? 'Français' : lang === 'ja' ? '日本語' : '中文'}
                            </option>
                        ))}
                    </select>
                    <h1 style={styles.headerH1(currentLanguage)}>{t.mainTitle}</h1>
                    <p>{t.subtitle}</p>
                </div>

                {/* Score Board */}
                <div style={styles.scoreBoard}>
                    <div style={styles.scoreItem}>
                        <div style={styles.scoreItemLabel}>{t.scoreLabel}</div>
                        <div style={styles.scoreValue}>{gameState.score}</div>
                    </div>
                    <div style={styles.scoreItem}>
                        <div style={styles.scoreItemLabel}>{t.correctLabel}</div>
                        <div style={styles.scoreValue}>{gameState.correctAnswers}</div>
                    </div>
                    <div style={styles.scoreItem}>
                        <div style={styles.scoreItemLabel}>{t.wrongItemsLabel}</div>
                        <div style={styles.scoreValue}>{gameState.wrongItemsCount}</div>
                    </div>
                </div>

                {/* Game Area */}
                <div style={styles.gameArea}>
                    {gameState.showScreen === 'welcome' && WelcomeScreen}
                    {gameState.showScreen === 'game' && GameScreen}
                    {gameState.showScreen === 'results' && ResultsScreen}
                </div>
            </div>
        </div>
    );
};