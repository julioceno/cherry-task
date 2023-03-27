class Timer {
  #delay = 3000;
  #execute?: () => void;

  #timerId?: number;
  #remaining?: number;

  setResume() {
    if (!this.#execute) {
      throw new Error('Passe as props necessárias!');
    }

    const callBack = this.#execute;
    const setResume = this.setResume;

    const remaining = () => {
      this.#remaining = this.#delay;
    };

    this.#timerId = window.setTimeout(function () {
      remaining();
      callBack?.();
      setResume();
    }, this.#remaining);
  }

  setReset() {
    window.clearTimeout(this.#timerId);
    this.#remaining = this.#delay;
  }

  setExecute(callBack: () => void) {
    this.#execute = callBack;
  }

  setProps(callBack: () => void) {
    this.#execute = callBack;
  }
}

const timer = new Timer();

export { timer };
