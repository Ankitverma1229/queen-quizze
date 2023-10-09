import React, { useState, useEffect, useRef } from "react";

const CountDown = ({ totalTime, handleSubmit }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const storedTotalTime = localStorage.getItem("totalTime");
    if (!storedTotalTime && totalTime > 0) {
      const initialMinutes = Math.floor(totalTime / 60);
      const initialSeconds = totalTime % 60;
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
      localStorage.setItem("totalTime", totalTime);
      localStorage.setItem("minutes", initialMinutes);
      localStorage.setItem("seconds", initialSeconds);
    }
  }, [totalTime]);

  useEffect(() => {
    const storedMinutes = parseInt(localStorage.getItem("minutes"), 10);
    const storedSeconds = parseInt(localStorage.getItem("seconds"), 10);

    if (!isNaN(storedMinutes) && !isNaN(storedSeconds)) {
      setMinutes(storedMinutes);
      setSeconds(storedSeconds);
    }
  }, []);

  useEffect(() => {
    if (totalTime > 0) {
      const intervalId = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalId);

          if (!isFirstRender.current) {
            localStorage.setItem("timer", timeLeft);
            handleSubmit();
          }
        } else {
          if (seconds === 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setSeconds(seconds - 1);
          }
          localStorage.setItem("minutes", minutes);
          localStorage.setItem("seconds", seconds);
        }
      }, 1000);

      isFirstRender.current = false;

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [totalTime, minutes, seconds]);

  return (
    <div>
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
};

export default CountDown;
