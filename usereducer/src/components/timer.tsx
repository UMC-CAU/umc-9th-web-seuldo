//import { useTimerState } from "../hooks/useState";
import { useTimerState } from "../hooks/useReducer";

export default function Timer() {

  useTimerState()

  const {
    time,
    isRunning,
    mode,
    start,
    stop,
    reset,
    setCountdown,
    changeMode,
  } = useTimerState();

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl border border-black">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
        TIMER
      </h2>

      <div className="flex justify-between mb-4">
        <button
          onClick={() => changeMode("up")}
          disabled={isRunning}
          className={`px-3 py-2 rounded-md font-medium transition 
            ${mode === "up" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}
            ${isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-200"}
          `}
        >
          카운트업
        </button>

        <button
          onClick={() => changeMode("down")}
          disabled={isRunning}
          className={`px-3 py-2 rounded-md font-medium transition 
            ${mode === "down" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}
            ${isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-200"}
          `}
        >
          카운트다운
        </button>
      </div>

      <p className="text-center text-gray-500 mb-2">Mode: {mode}</p>
      <h3 className="text-4xl font-semibold text-center mb-6">{time}초</h3>

      {mode === "down" && (
        <div className="mb-5">
          <input
            type="number"
            placeholder="초 입력"
            disabled={isRunning}
            onChange={(e) => setCountdown(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300 
              disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      )}

      <div className="flex justify-center gap-3">
        {isRunning ? (
          <button
            onClick={stop}
            className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={start}
            className="px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600"
          >
            Start
          </button>
        )}

        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
