import { useEffect, useState } from "react";

type TimerMode = "up" | "down";

export function useTimerState() {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(60); // countdown 기본값
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("up"); // up/down 모두 지원

  // 타이머 동작
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (mode === "up") {
          return prev + 1;
        } else {
          // 카운트다운
          if (prev <= 0) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  // START
  const start = () => {
    if (mode === "down" && time <= 0) return;
    setIsRunning(true);
  };

  // STOP
  const stop = () => {
    setIsRunning(false);
  };

  // RESET
  const reset = () => {
    setIsRunning(false);
    if (mode === "up") {
      setTime(0);
    } else {
      setTime(initialTime);
    }
  };

  // 카운트다운 설정
  const setCountdown = (value: number) => {
    setInitialTime(value);
    setTime(value);
  };

  // 모드 변경
  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    if (newMode === "up") {
      setTime(0);
    } else {
      setTime(initialTime);
    }
  };

  return {
    time,
    isRunning,
    mode,
    start,
    stop,
    reset,
    setCountdown,
    changeMode,
  };
}
