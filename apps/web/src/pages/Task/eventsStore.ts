import { makeAutoObservable, autorun, toJS } from 'mobx';
import { KeyboardEvent } from 'react';
import { KeysEnum } from '../../enums';
import { IStep } from './types';

class EventsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  steps: IStep[] = [
    {
      indice: 1,
      label: null,
      checked: false,
      focus: true,
    },
  ];

  setSteps(steps: IStep[]) {
    this.steps = steps;
  }

  indiceLastCreated: Nullable<number> = null;
  setLastCreated(indice: Nullable<number>) {
    this.indiceLastCreated = indice;
  }

  #handleOnFocus(indice: number) {
    document.getElementById(indice?.toString())?.focus();
  }

  handleOnFocusInLastCreated() {
    if (this.indiceLastCreated) {
      this.#handleOnFocus(this.indiceLastCreated);
      this.setLastCreated(null);
    }
  }

  createStepItem(): IStep {
    return {
      indice: this.steps.length + 1,
      label: null,
      checked: false,
      focus: true,
    };
  }

  createStep(indice: number) {
    const index = this.steps.findIndex((step) => step.indice == indice);

    const tempSteps = this.steps.map((step) => ({
      ...step,
      focus: false,
    }));

    const newElement = this.createStepItem();
    tempSteps.splice(index + 1, 0, newElement);
    this.setLastCreated(newElement.indice);
    this.setSteps(tempSteps);

    this.#handleOnFocus(newElement.indice);
  }

  deleteStep(indice: number) {
    if (this.steps.length === 1) return this.setSteps([this.createStepItem()]);
    const newSteps = this.steps.filter((step) => step.indice !== indice);
    this.setSteps(newSteps);
  }

  handleOnChange(indice: number, value: Nullable<string>) {
    const index = this.#findIndex(indice);

    const tempSteps = Array.from(this.steps);
    tempSteps[index].label = value;
    this.setSteps(tempSteps);
  }

  handleOnKeyUp(indice: number, event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && event.key === KeysEnum.ENTER) {
      event.preventDefault();
      return this.createStep(indice);
    }

    if (event.key === KeysEnum.BACKSPACE) {
      this.#onKeyBackspace(indice);
    }
  }

  handleOnKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && event.key === KeysEnum.ENTER) {
      event.preventDefault();
    }
  }

  #onKeyBackspace(indice: number) {
    const index = this.#findIndex(indice);
    if (!index) return;

    const element = this.steps[index] as IStep;

    if (!element.label?.length && element.label !== null)
      return this.handleOnChange(indice, null);

    if (element.label === null) {
      this.deleteStep(indice);

      const getLastIndice = this.steps[index - 1].indice;
      this.#handleOnFocus(getLastIndice);
    }
  }

  toggleCheckbox(indice: number) {
    const index = this.steps.findIndex((step) => step.indice == indice);
    const steps = Array.from(this.steps);
    steps[index].checked = !steps[index].checked;
    this.setSteps(steps);
  }

  #findIndex(indice: number) {
    const index = this.steps.findIndex((step) => step.indice === indice);
    return index;
  }

  populateSteps(
    steps?: { id: string; title: Nullable<string>; checked: boolean }[]
  ) {
    if (!steps?.length) {
      return (this.steps = [this.createStepItem()]);
    }

    const values: IStep[] = steps.map((step, indice) => ({
      indice: indice + 1,
      focus: false,
      label: step.title,
      ...step,
    }));

    this.steps = values;
  }

  clear() {
    this.steps = [];
    this.indiceLastCreated = null;
  }
}

export const eventsStore = new EventsStore();
