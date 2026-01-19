// PlasticDetective.tsx
'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Image from "next/image";
import type { StaticImageData } from 'next/image';
import { usePostHog } from 'posthog-js/react';

// ----------  TYPES  ----------
type LanguageKey = 'en' | 'ja' | 'zh';
type GameScreen = 'welcome' | 'game' | 'clawMachine' | 'results';

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
    shouldRecycle: string;
    easyExamples: string;
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
    clawTitle: string;
    clawSubtitle: string;
    clawRemoved: string;
    clawTotalItems: string;
    clawContinue: string;
    clawFinish: string;
}

interface PlasticItem {
    id: number;
    name: string;
    image: StaticImageData
    recyclable: boolean;
    category: string;
}

interface GameState {
    score: number;
    correctAnswers: number;
    wrongItemsCount: number;
    currentQuestionIndex: number;
    showScreen: GameScreen;
    feedback: { message: string; type: 'correct' | 'incorrect' | null };
}

// ----------  TRANSLATIONS  ----------
const TRANSLATIONS: Record<LanguageKey, Translation> = {
    en: {
        mainTitle: '🕵️ Plastic Detective',
        subtitle: 'Can it be recycled? You decide!',
        scoreLabel: 'Score',
        correctLabel: 'Correct',
        wrongItemsLabel: 'Wrong Items',
        welcomeTitle: 'Welcome to Plastic Detective!',
        welcomeText: 'Look at each plastic item and decide if it can be recycled curbside or not.',
        guideTitle: 'Quick Recycling Guide:',
        easyRecycle: 'Easy to Recycle (✓):',
        shouldRecycle: 'Should Recycle, But Low Value & Extra Care',
        easyExamples: '#1 PET - Water bottles, soda bottles\n#2 HDPE - Milk jugs, detergent bottles\n#5 PP - Microwave containers, disposable tableware',
        localExamples: '#3 PVC - Plastic water pipes, raincoats',
        specialDrop: 'Hard to Recycle',
        dropExamples: '#4 LDPE - Plastic bags, film wrap\n#6 PS - Disposable cups, foam packaging (low value, extra care)',
        startButton: 'Start Game',
        questionText: 'Can this be recycled curbside?',
        plasticHint: 'Hint: check the recycling symbol',
        yesButton: '✓ YES – Recyclable',
        noButton: '✗ NO – Not Recyclable',
        resultsTitle: 'Congrats🎉, Proceed to Claw Machine.',
        finalScore: 'Take the hard-to-recycle item out.',
        playAgainButton: 'Play Again',
        learnMoreButton: 'Learn More',
        correctFeedback: 'Correct!',
        incorrectFeedback: 'Not quite!',
        recyclingTips: 'Recycling Tips',
        alwaysRecyclable: 'ALWAYS recyclable curbside',
        waterBottles: 'Water bottles',
        milkJugs: 'Milk jugs',
        neverRecyclable: 'Check locally',
        plasticBags: 'Plastic bags',
        whenInDoubt: 'When in doubt, check locally',
        clawTitle: '🦾 Claw Machine – Remove Non-Recyclables!',
        clawSubtitle: 'Click every item that CANNOT be recycled curbside.',
        clawRemoved: 'Removed',
        clawTotalItems: 'items',
        clawContinue: 'Continue →',
        clawFinish: 'Finish',
    },
    ja: {
        mainTitle: '🕵️ プラスチック探偵',
        subtitle: 'リサイクルできますか？あなたが決めて！',
        scoreLabel: 'スコア',
        correctLabel: '正解',
        wrongItemsLabel: '間違ったアイテム',
        welcomeTitle: 'プラスチック探偵へようこそ！',
        welcomeText: '各プラスチック製品を見て、道端でリサイクルできるかどうかを決めてください。',
        guideTitle: 'クイックリサイクルガイド：',
        easyRecycle: '簡単にリサイクル（✓）：',
        shouldRecycle: 'リサイクルすべきだが、価値が低く、特別な注意が必要',
        easyExamples: '#1 PET – 水ボトル、ソーダボトル\n#2 HDPE – 牛乳パック、洗剤ボトル\n#5 PP – 電子レンジ容器、使い捨て食器',
        localExamples: '#3 PVC – プラスチック製の水道管、レインコート',
        specialDrop: 'リサイクル困難',
        dropExamples: '#4 LDPE – ビニール袋、フィルムラップ\n#6 PS – 使い捨てカップ、発泡パッケージ（低価値、特別注意）',
        startButton: 'ゲーム開始',
        questionText: 'これは道端でリサイクルできますか？',
        plasticHint: 'ヒント：リサイクルシンボルを確認',
        yesButton: '✓ はい – リサイクル可能',
        noButton: '✗ いいえ – リサイクル不可',
        resultsTitle: '🎉 お疲れ様、リサイクルチャンピオン！',
        finalScore: '最終スコア',
        playAgainButton: 'もう一度プレイ',
        learnMoreButton: '詳細を学ぶ',
        correctFeedback: '正解！',
        incorrectFeedback: '正確ではありません！',
        clawTitle: '🦾 クレーンゲーム – リサイクル不可を除去！',
        clawSubtitle: '道端でリサイクルできないアイテムをクリックしてください。',
        clawRemoved: '削除済み',
        clawTotalItems: '個',
        clawContinue: '続行 →',
        clawFinish: '終了',
    },
    zh: {
        mainTitle: '🕵️ 塑料侦探',
        subtitle: '可以回收吗？你来决定！',
        scoreLabel: '得分',
        correctLabel: '正确',
        wrongItemsLabel: '错误物品',
        welcomeTitle: '欢迎来到塑料侦探！',
        welcomeText: '查看每个塑料制品，决定它是否可以在路边回收。',
        guideTitle: '快速回收指南：',
        easyRecycle: '易于回收（✓）：',
        shouldRecycle: '应该回收，但价值低且需要额外注意',
        easyExamples: '#1 PET – 水瓶、汽水樽\n#2 HDPE – 牛奶罐、洗洁剂樽\n#5 PP – 微波炉容器、一次性餐具',
        localExamples: '#3 PVC – 塑膠水管、雨衣',
        specialDrop: '回收困难',
        dropExamples: '#4 LDPE – 塑料袋、保鲜膜\n#6 PS – 一次性杯、泡沫包装（低价值、需特别注意）',
        startButton: '开始游戏',
        questionText: '这个可以在路边回收吗？',
        plasticHint: '提示：检查回收标志',
        yesButton: '✓ 是 – 可回收',
        noButton: '✗ 否 – 不可回收',
        resultsTitle: '🎉 干得好，回收冠军！',
        finalScore: '最终得分',
        playAgainButton: '再玩一次',
        learnMoreButton: '了解更多',
        correctFeedback: '正确！',
        incorrectFeedback: '不完全正确！',
        clawTitle: '🦾 抓娃娃机 – 移除不可回收物！',
        clawSubtitle: '单击所有不能在路边回收的物品。',
        clawRemoved: '已移除',
        clawTotalItems: '件',
        clawContinue: '继续 →',
        clawFinish: '完成',
    },
};

// ----------  PLASTIC ITEMS  ----------
const PLASTIC_ITEMS: PlasticItem[] = [
    {
        id: 1,
        name: 'Water Bottle',
        image: PET1_REAL,
        recyclable: true,
        category: 'PET #1',
    },
    {
        id: 2,
        name: 'Plastic Bag',
        image: PVC_7,
        recyclable: false,
        category: 'LDPE #7',
    },
    {
        id: 3,
        name: 'Milk Jug',
        image: HDPE_2,
        recyclable: true,
        category: 'HDPE #2',
    },
];

// ----------  GAME STATE  ----------
const INITIAL_GAME_STATE: GameState = {
    score: 0,
    correctAnswers: 0,
    wrongItemsCount: 0,
    currentQuestionIndex: 0,
    showScreen: 'welcome',
    feedback: { message: '', type: null },
};

// ----------  STYLES  ----------
// 1.  Declare bucket base FIRST (outside styles object)
const bucketBase: React.CSSProperties = {
    flex: 1,
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    border: '3px solid',
};

// 2.  Then build styles object (WITHOUT declaring inside it)
const styles = {
    body: (lang: LanguageKey): React.CSSProperties => ({
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
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
        padding: '20px',
        textAlign: 'center' as const,
        position: 'relative' as const,
        flexShrink: 0,
    },
    headerH1: (lang: LanguageKey): React.CSSProperties => ({
        fontSize: lang === 'ja' ? '2.0em' : lang === 'zh' ? '2.2em' : '2.2em',
        marginBottom: '5px',
    }),
    languageSelector: {
        position: 'absolute' as const,
        top: '10px',
        right: '10px',
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '20px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.9em',
    },
    scoreBoard: {
        display: 'flex',
        justifyContent: 'space-around',
        background: '#f5f5f5',
        padding: '10px',
        borderBottom: '2px solid #ddd',
        flexShrink: 0,
    },
    scoreItem: {
        textAlign: 'center' as const,
    },
    scoreItemLabel: {
        fontSize: '1.0em',
        color: '#666',
        marginBottom: '3px',
    },
    scoreValue: {
        fontSize: '1.8em',
        fontWeight: 'bold' as const,
        color: '#4CAF50',
    },
    gameArea: {
        padding: '15px',
        textAlign: 'center' as const,
        flex: 1,
        overflowY: 'auto' as const,
    },
    plasticImageContainer: {
        background: '#f9f9f9',
        border: '3px solid #ddd',
        borderRadius: '15px',
        padding: '15px',
        margin: '15px auto',
        maxWidth: '350px',
    },
    plasticImage: {
        width: '100%',
        height: '200px',
        objectFit: 'contain' as const,
        borderRadius: '10px',
        background: 'white',
        border: '2px solid #eee',
    },
    plasticHint: {
        marginTop: '10px',
        fontSize: '1.0em',
        color: '#666',
        fontStyle: 'italic' as const,
    },
    recycleButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        margin: '20px 0',
    },
    recycleButton: {
        padding: '12px 30px',
        fontSize: '1.1em',
        border: 'none',
        borderRadius: '8px',
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
    feedback: (type: 'correct' | 'incorrect' | null): React.CSSProperties => ({
        margin: '15px 0',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '1.0em',
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
    bucketContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px 0',
        gap: '20px',
    },
    // 3.  USE the pre-declared variable
    bucket: bucketBase, // ✅ no inline declaration
    bucketEasy: { borderColor: '#4CAF50' },
    bucketCheck: { borderColor: '#FFC107' },
    bucketSpecial: { borderColor: '#9C27B0' },
    bucketIcon: {
        width: '100px',
        height: '100px',
        margin: '0 auto 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3em',
        borderRadius: '50%',
    },
    bucketExamples: {
        fontSize: '0.9em',
        color: '#666',
        lineHeight: 1.4,
        whiteSpace: 'pre-line' as const,
    },
    clawGrid: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap' as const,
        margin: '20px 0',
    },
    clawItemBtn: (isOut: boolean): React.CSSProperties => ({
        width: '140px',
        height: '140px',
        fontSize: '2.5em',
        borderRadius: '15px',
        border: '3px solid #fff',
        background: isOut ? '#888' : '#f44336',
        color: 'white',
        cursor: isOut ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
    }),
    clawProgress: {
        fontSize: '1.2em',
        margin: '15px 0',
    },
};

// ----------  PHOTO  ----------
// ➜  place  "Screenshot 2025-10-02 at 12.00.11 PM.png"  next to this file
import PET_PHOTO from './PET-recycle-guide.png';
import LDPE from './LDPE_PS.png';
import PET1_REAL from './PET1-real.jpg';
import PVC_7 from './PVC_7.jpg';
import HDPE_2 from './HDPE_2.jpg'


// ----------  COMPONENT  ----------
export default function PlasticDetective() {
    const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
    const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>('en');
    const [clawRemoved, setClawRemoved] = useState<string[]>([]);

    const t = useMemo(() => TRANSLATIONS[currentLanguage], [currentLanguage]);
    const currentItem = PLASTIC_ITEMS[gameState.currentQuestionIndex];
    const { feedback } = gameState;
    const nonRecyclables = PLASTIC_ITEMS.filter((it) => !it.recyclable);
    const allRemoved = clawRemoved.length === nonRecyclables.length;

    const posthog = usePostHog(); // Initialize the tool

    useEffect(() => {
        if (posthog) {
            posthog.capture('screen_viewed', {
                screen_name: gameState.showScreen,
                language: currentLanguage
            });
        }
    }, [gameState.showScreen, posthog, currentLanguage]);

    // ----------  GAME LOGIC  ----------
    const startGame = useCallback(() => {
        posthog?.capture('game_started'); // Add this line
        setGameState((p) => ({ ...p, showScreen: 'game', feedback: { message: '', type: null } }));
    }, [posthog]); // Add posthog to this dependency array

    const playAgain = useCallback(() => {
        setGameState(INITIAL_GAME_STATE);
        setClawRemoved([]);
    }, []);

    const learnMore = useCallback(() => {
        alert(
            `💡 ${t.recyclingTips}\n\n✅ ${t.alwaysRecyclable}:\n- #1 PET: ${t.waterBottles}\n- #2 HDPE: ${t.milkJugs}\n\n❌ ${t.neverRecyclable}:\n- #4 LDPE: ${t.plasticBags}\n\n${t.whenInDoubt}`
        );
    }, [t]);

    const answerRecycle = useCallback(
        (userAnswer: boolean) => {
            if (!currentItem) return;
            const isCorrect = userAnswer === currentItem.recyclable;
            let msg = `✓ ${t.correctFeedback}  ${currentItem.name} (${currentItem.category})  ${currentItem.recyclable ? 'can be recycled!' : 'cannot be recycled curbside.'
                }`;
            if (!isCorrect)
                msg = `✗ ${t.incorrectFeedback}  ${currentItem.name} (${currentItem.category})  ${currentItem.recyclable ? 'can be recycled!' : 'cannot be recycled curbside.'
                    }`;

            posthog?.capture('item_answered', {
                item_name: currentItem.name,
                is_correct: isCorrect,
                score_so_far: gameState.score
            });

            setGameState((p) => ({
                ...p,
                score: p.score + (isCorrect ? 10 : 0),
                correctAnswers: p.correctAnswers + (isCorrect ? 1 : 0),
                wrongItemsCount: p.wrongItemsCount + (isCorrect ? 0 : 1),
                feedback: { message: msg, type: isCorrect ? 'correct' : 'incorrect' },
            }));

            setTimeout(() => {
                setGameState((p) => {
                    const next = p.currentQuestionIndex + 1;
                    if (next >= PLASTIC_ITEMS.length) {
                        posthog?.capture('game_completed', {
                            final_total_score: gameState.score + (isCorrect ? 10 : 0)
                        });
                        return { ...p, showScreen: 'clawMachine', feedback: { message: '', type: null } };
                    }
                    return { ...p, currentQuestionIndex: next, feedback: { message: '', type: null } };
                });
            }, 2000);
        },
        [currentItem, t]
    );

    // ----------  SCREENS  ----------
    // ➜  inside your PlasticDetective.tsx  –  replace ONLY  WelcomeScreen  with this:

    // ➜  inside your PlasticDetective.tsx  –  replace ONLY  WelcomeScreen  with this:

    // ----------  WelcomeScreen  (buckets re-ordered, titles black-bold) ----------
    const WelcomeScreen = (
        <div id="welcomeScreen">
            <h2 style={{ fontSize: '1.8em', marginBottom: '15px' }}>{t.welcomeTitle}</h2>
            <p style={{ marginBottom: '25px' }}>{t.welcomeText}</p>

            {/*  BUCKETS :  #2 → #5 → #3 → #6 → #4  */}
            <div style={styles.bucketContainer}>
                {/*  1.  EASY (black-bold title, full photo)  */}
                <div style={{ ...styles.bucket, ...styles.bucketEasy }}>
                    <h5 style={{ color: '#000', fontWeight: 'bold', marginBottom: 10 }}>{t.easyRecycle}</h5>
                    <div style={{ width: '100%', margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src={PET_PHOTO}
                            alt="PET/HDPE/PP examples"
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
                            sizes="(max-width: 350px) 100vw, 350px"
                        />
                    </div>
                    <div style={styles.bucketExamples}>{t.easyExamples}</div>
                </div>,

                {/*  2.  SHOULD RECYCLE (black-bold)  */}
                <div style={{ ...styles.bucket, ...styles.bucketCheck }}>
                    <h5 style={{ color: '#000', fontWeight: 'bold', marginBottom: 10 }}>{t.shouldRecycle}</h5>
                    <div style={{ width: '100%', margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src={LDPE}
                            alt="LDPE examples"
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
                            sizes="(max-width: 350px) 100vw, 350px"
                        />
                    </div>
                    <div style={styles.bucketExamples}>{t.dropExamples}</div>
                </div>,

                {/*  3.  HARD TO RECYCLE (black-bold)  */}
                <div style={{ ...styles.bucket, ...styles.bucketSpecial }}>
                    <h5 style={{ color: '#000', fontWeight: 'bold', marginBottom: 10 }}>{t.specialDrop}</h5>
                    <div style={styles.bucketExamples}>{t.localExamples}</div>
                </div>,
            </div>

            <button style={{ ...styles.recycleButton, ...styles.recycleYes }} onClick={startGame}>
                {t.startButton}
            </button>
        </div>
    );
    const GameScreen = currentItem && (
        <div id="gameScreen">
            <h2 style={{ fontSize: '1.8em', marginBottom: '20px' }}>{t.questionText}</h2>
            <div style={styles.plasticImageContainer}>
                <Image style={styles.plasticImage} src={currentItem.image} alt={currentItem.name} />
                <div style={styles.plasticHint}>{t.plasticHint}: {currentItem.category}</div>
            </div>
            <div style={styles.recycleButtons}>
                <button style={{ ...styles.recycleButton, ...styles.recycleYes }} onClick={() => answerRecycle(true)} disabled={!!feedback.type}>
                    {t.yesButton}
                </button>
                <button style={{ ...styles.recycleButton, ...styles.recycleNo }} onClick={() => answerRecycle(false)} disabled={!!feedback.type}>
                    {t.noButton}
                </button>
            </div>
            {feedback.type && <div style={styles.feedback(feedback.type)}>{feedback.message}</div>}
        </div>
    );

    const ClawMachineScreen = (
        <div id="clawMachineScreen">
            <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#000', fontWeight: 'bold' }}>
                Proceed to Claw Machine Game 🦾 - Remove the Odd
            </h2>
            <p style={{ marginBottom: '20px', color: '#000', fontWeight: 'bold' }}>
                Click every item that CANNOT be recycled curbside.
            </p>
            <div style={{ ...styles.clawProgress, color: '#000', fontWeight: 'bold' }}>
                {t.clawRemoved}: {clawRemoved.length} / 1 {t.clawTotalItems}
            </div>

            <button
                style={{ ...styles.recycleButton, ...styles.recycleYes }}
                onClick={() => setGameState((p) => ({ ...p, score: p.score + 5, showScreen: 'results' }))}
            >
                {t.clawFinish}
            </button>
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
                <button style={{ ...styles.recycleButton, ...styles.recycleYes, width: '200px', marginBottom: '15px' }} onClick={playAgain}>
                    {t.playAgainButton}
                </button>
                <button style={{ ...styles.recycleButton, background: '#2196F3', width: '200px' }} onClick={learnMore}>
                    {t.learnMoreButton}
                </button>
            </div>
        </div>
    );

    // ----------  MAIN RENDER  ----------
    return (
        <div style={styles.body(currentLanguage)}>
            <div style={styles.appContainer}>
                <div style={styles.header}>
                    <select style={styles.languageSelector} value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value as LanguageKey)}>
                        {Object.keys(TRANSLATIONS).map((lang) => (
                            <option key={lang} value={lang}>
                                {lang === 'en' ? 'English' : lang === 'ja' ? '日本語' : '中文'}
                            </option>
                        ))}
                    </select>
                    <h1 style={styles.headerH1(currentLanguage)}>{t.mainTitle}</h1>
                    <p>{t.subtitle}</p>
                </div>

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

                <div style={styles.gameArea}>
                    {gameState.showScreen === 'welcome' && WelcomeScreen}
                    {gameState.showScreen === 'game' && GameScreen}
                    {gameState.showScreen === 'clawMachine' && ClawMachineScreen}
                    {gameState.showScreen === 'results' && ResultsScreen}
                </div>
            </div>
        </div>
    );
}