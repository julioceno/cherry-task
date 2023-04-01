import { makeAutoObservable, autorun } from 'mobx';
import { KeyboardEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { KeysEnum } from '../../enums';
import { ITask } from './types';

class Events {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  tasks: ITask[] = [this.createTask()]; // FIXME arrumar um nome melhor para tasks
  setTasks(tasks: ITask[]) {
    this.tasks = tasks;
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

  createTask(): ITask {
    return {
      indice: this.tasks?.length ? this.tasks.length + 1 : 1,
      label: null,
      checked: false,
      focus: true,
    };
  }

  createStep(indice: number) {
    const index = this.tasks.findIndex((task) => task.indice == indice);

    const tempTasks = this.tasks.map((task) => ({
      ...task,
      focus: false,
    }));

    const newElement = this.createTask();
    tempTasks.splice(index + 1, 0, newElement);
    this.setLastCreated(newElement.indice);
    this.setTasks(tempTasks);

    this.#handleOnFocus(newElement.indice);
  }

  deleteStep(indice: number) {
    console.log('step');
    if (this.tasks.length === 1) return this.setTasks([this.createTask()]);
    const newTasks = this.tasks.filter((task) => task.indice !== indice);
    this.setTasks(newTasks);
  }

  handleOnChange(indice: number, value: Nullable<string>) {
    const index = this.#findIndex(indice);

    const tempTasks = Array.from(this.tasks);
    tempTasks[index].label = value;
    this.setTasks(tempTasks);
  }

  handleOnKeyUp(indice: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === KeysEnum.ENTER) {
      return this.createStep(indice);
    }

    if (event.key === KeysEnum.BACKSPACE) {
      this.#onKeyBackspace(indice);
    }
  }

  #onKeyBackspace(indice: number) {
    const index = this.#findIndex(indice);
    if (!index) return;

    const element = this.tasks[index] as ITask;

    if (!element.label?.length && element.label !== null)
      return this.handleOnChange(indice, null);

    if (element.label === null) {
      this.deleteStep(indice);

      const getLastIndice = this.tasks[index - 1].indice;
      this.#handleOnFocus(getLastIndice);
    }
  }

  toggleCheckbox(indice: number) {
    const index = this.tasks.findIndex((task) => task.indice == indice);
    const tasks = Array.from(this.tasks);
    tasks[index].checked = !tasks[index].checked;
    this.setTasks(tasks);
  }

  #findIndex(indice: number) {
    const index = this.tasks.findIndex((task) => task.indice === indice);
    return index;
  }

  clear() {
    this.tasks = [this.createTask()];
    this.indiceLastCreated = null;
  }
}

export const events = new Events();
