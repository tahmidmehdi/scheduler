import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    setMode(nextMode);
    if (replace) { // replace the last element in history with the nextMode
      setHistory(prev => [...prev.slice(0, -1), nextMode]);
    } else {
      setHistory(prev => [...prev, nextMode]);
    }
  }

  function back() {
    if (history.length > 1) {  // if there is more than one element in history
      setHistory(prev => [...prev.slice(0, -1)]);
      setMode(history[history.length - 2]);
    }
  }

  return { mode, transition, back };
}
