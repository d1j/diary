const rand1to5 = () => {
  return Math.floor(Math.random() * 5) + 1;
};

const randWentToSleep = (day) => {
  let hour = Math.floor(Math.random() * 3) + 20;
  return new Date(2020, 11, day, hour);
};

const randWokeUp = (day) => {
  let hour = Math.floor(Math.random() * 3) + 7;
  return new Date(2020, 11, day, hour);
};

const genDayStats = () => {
  const arr = [];
  let wentToSleep = randWentToSleep(0),
    wokeUp;
  for (let i = 1; i <= 31; i++) {
    wokeUp = randWokeUp(i);
    let sleepTime = wokeUp.getTime() - wentToSleep.getTime();
    wentToSleep = randWentToSleep(i);
    let obj = {
      id: i + 20,
      date: new Date(2020, 11, i),
      mood: rand1to5(),
      energy: rand1to5(),
      motivation: rand1to5(),
      wokeUp,
      wentToSleep,
      sleepTime,
    };
    arr.push(obj);
  }
  return arr;
};
module.exports.genDayStats = genDayStats;
