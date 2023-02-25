class Timer {
  delay?: number;
  excute?: () => void;

  timerId?: number;
  remaining?: number;

  setResume() {
    if (!this.delay || !this.excute) {
      throw new Error('Passe as props necessárias!');
    }

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

  setDelay(delay: number) {
    this.delay = delay;
  }

  setProps(callBack: () => void, delay: number) {
    this.excute = callBack;
    this.delay = delay;
  }
}

export { Timer };
