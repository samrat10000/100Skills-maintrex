import React, { useEffect, useState } from 'react';

const Countdown = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTime = (diff, status) => {
    return {
      status,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const updateCountdown = () => {
      const now = new Date();

      if (now < start) {
        const diff = start - now;
        setTimeLeft(calculateTime(diff, ));
      } else if (now >= start && now < end) {
        const diff = end - now;
        setTimeLeft(calculateTime(diff,));
      } else {
        setTimeLeft({ status: 'Registration Closed' });
      }
    };

    updateCountdown(); // initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <div className="font-mono">
      {timeLeft.status === 'Registration Closed' ? (
        <div className="text-red-500 font-semibold">Registration Closed</div>
      ) : (
        <div className="text-gray-800">
          <p className="text-sm text-gray-500">{timeLeft.status}</p>
          <p className="text-lg font-bold">
            {timeLeft.days ?? 0}d {timeLeft.hours ?? 0}h {timeLeft.minutes ?? 0}m {timeLeft.seconds ?? 0}s
          </p>
        </div>
      )}
    </div>
  );
};

export default Countdown;
