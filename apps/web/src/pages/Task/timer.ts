class Timer {
  constructor(callBack: () => void, delay: number) {
    this.delay = delay;
  }

  delay: number;
  excute?: () => void;

  timerId?: number;
  remaining?: number;

  setResume() {
    const callBack = this.excute;
    const setResume = this.setResume;

    const remaining = () => {
      this.remaining = this.delay;
    };

    this.timerId = window.setTimeout(function () {
      remaining();
      callBack?.();
      setResume();
    }, this.remaining);
  }

  setReset() {
    window.clearTimeout(this.timerId);
    this.remaining = this.delay;
  }

  setExecute(callBack: () => void) {
    this.excute = callBack;
  }
}

export { Timer };
