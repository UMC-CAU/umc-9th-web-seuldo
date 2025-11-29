import { useEffect, useReducer } from "react";

type TimerMode = "up" | "down";

interface TimerState {
  time: number;
  initialTime: number;
  isRunning: boolean;
  mode: TimerMode;
}

type TimerAction =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "TICK" }
  | { type: "RESET" }
  | { type: "SET_COUNTDOWN"; payload: number }
  | { type: "CHANGE_MODE"; payload: TimerMode };

const initialState: TimerState = {
  time: 0,
  initialTime: 60,
  isRunning: false,
  mode: "up",
};

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "START":
      // countdown에서 time이 0 이하이면 시작 불가
      if (state.mode === "down" && state.time <= 0) return state;
      return { ...state, isRunning: true };

    case "STOP":
      return { ...state, isRunning: false };

    case "TICK":
      if (!state.isRunning) return state;

      if (state.mode === "up") {
        return { ...state, time: state.time + 1 };
      } else {
        // countdown
        if (state.time <= 0) {
          return { ...state, isRunning: false, time: 0 };
        }
        return { ...state, time: state.time - 1 };
      }

    case "RESET":
      return {
        ...state,
        isRunning: false,
        time: state.mode === "up" ? 0 : state.initialTime,
      };

    case "SET_COUNTDOWN":
      return {
        ...state,
        initialTime: action.payload,
        time: action.payload,
      };

    case "CHANGE_MODE":
      return {
        ...state,
        mode: action.payload,
        time: action.payload === "up" ? 0 : state.initialTime,
      };

    default:
      return state;
  }
}

export function useTimerState() {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // interval 처리
  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, state.mode]);

  return {
    time: state.time,
    isRunning: state.isRunning,
    mode: state.mode,

    start: () => dispatch({ type: "START" }),
    stop: () => dispatch({ type: "STOP" }),
    reset: () => dispatch({ type: "RESET" }),
    setCountdown: (value: number) =>
      dispatch({ type: "SET_COUNTDOWN", payload: value }),
    changeMode: (mode: TimerMode) =>
      dispatch({ type: "CHANGE_MODE", payload: mode }),
  };
}
