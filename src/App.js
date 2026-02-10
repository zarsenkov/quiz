import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';

// --- БАЗА ВОПРОСОВ ---
const QUESTIONS = [
  {
    q: "Какая планета самая большая в Солнечной системе?",
    a: ["Марс", "Юпитер", "Сатурн", "Венера"],
    correct: 1
  },
  {
    q: "Кто написал 'Преступление и наказание'?",
    a: ["Толстой", "Чехов", "Достоевский", "Пушкин"],
    correct: 2
  },
  {
    q: "Какой химический символ у золота?",
    a: ["Ag", "Fe", "Au", "Cu"],
    correct: 2
  }
];

export default function App() {
  const [step, setStep] = useState('start'); // start, play, result
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  // --- ЛОГИКА ОТВЕТА ---
  // Проверяет правильность и блокирует нажатия до перехода
  const handleAnswer = (index) => {
    if (isLocked) return;
    setSelected(index);
    setIsLocked(true);

    if (index === QUESTIONS[currentQ].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setIsLocked(false);
      } else {
        setStep('result');
      }
    }, 1200);
  };

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        
        {/* ЭКРАН 1: СТАРТ */}
        {step === 'start' && (
          <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={styles.card}>
            <HelpCircle size={48} color="#FBBF24" style={{ marginBottom: '20px' }} />
            <h1 style={styles.title}>ИНТЕЛЛЕКТ<br/><span style={{ color: '#FBBF24' }}>ШОУ</span></h1>
            <p style={styles.desc}>Проверь свои знания в нашей викторине.</p>
            <button style={styles.startBtn} onClick={() => setStep('play')}>НАЧАТЬ ИГРУ</button>
          </motion.div>
        )}

        {/* ЭКРАН 2: ВОПРОСЫ */}
        {step === 'play' && (
          <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.quizContent}>
            <p style={styles.progress}>ВОПРОС {currentQ + 1} ИЗ {QUESTIONS.length}</p>
            <h2 style={styles.question}>{QUESTIONS[currentQ].q}</h2>
            
            <div style={styles.optionsGrid}>
              {QUESTIONS[currentQ].a.map((opt, i) => {
                let color = 'rgba(255,255,255,0.05)';
                if (isLocked) {
                  if (i === QUESTIONS[currentQ].correct) color = '#22C55E';
                  else if (i === selected) color = '#EF4444';
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={!isLocked ? { scale: 1.02, background: 'rgba(255,255,255,0.1)' } : {}}
                    onClick={() => handleAnswer(i)}
                    style={{ ...styles.optionBtn, background: color }}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ЭКРАН 3: РЕЗУЛЬТАТ */}
        {step === 'result' && (
          <motion.div key="result" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-panel" style={styles.card}>
            <Award size={64} color="#FBBF24" style={{ marginBottom: '20px' }} />
            <h2 style={styles.title}>ФИНАЛ</h2>
            <p style={styles.desc}>Ваш результат: <br/> <strong>{score} из {QUESTIONS.length}</strong></p>
            <button style={styles.startBtn} onClick={() => window.location.reload()}>
              <RotateCcw size={18} /> ЗАНОГО
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// --- СТИЛИ ---
const styles = {
  container: { width: '100%', maxWidth: '500px', padding: '20px' },
  card: { padding: '40px', textAlign: 'center' },
  title: { fontSize: '32px', fontWeight: '900', margin: '0 0 15px 0', letterSpacing: '1px' },
  desc: { fontSize: '16px', opacity: 0.7, marginBottom: '30px', lineHeight: '1.5' },
  startBtn: { background: '#FBBF24', color: '#0F172A', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' },
  quizContent: { width: '100%' },
  progress: { fontSize: '12px', fontWeight: '700', color: '#FBBF24', textAlign: 'center', marginBottom: '10px' },
  question: { fontSize: '24px', textAlign: 'center', marginBottom: '40px', fontWeight: '700' },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: '15px' },
  optionBtn: { padding: '20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white', fontSize: '18px', textAlign: 'left', cursor: 'pointer', transition: '0.3s' }
};
