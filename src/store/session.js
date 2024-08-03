const SESSION_KEY = 'quizz-session';
const TIMER_KEY = 'quizz-timer';

export function loadSession() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : { answers: [], currentQuestion: 1 };
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function resetSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TIMER_KEY);
}

export function saveTimer(time) {
  localStorage.setItem(TIMER_KEY, JSON.stringify(time));
}

export function loadTimer() {
  const time = localStorage.getItem(TIMER_KEY);
  return time ? JSON.parse(time) : null;
}

export default {
  loadSession,
  saveSession,
  resetSession,
  saveTimer,
  loadTimer
};
