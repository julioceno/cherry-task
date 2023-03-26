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

  idLastCreated: Nullable<string> = null;
  setLastCreated(id: Nullable<string>) {
    this.idLastCreated = id;
  }

  #handleOnFocus(id: string) {
    document.getElementById(id)?.focus();
  }

  handleOnFocusInLastCreated() {
    if (this.idLastCreated) {
      this.#handleOnFocus(this.idLastCreated);
      this.setLastCreated(null);
    }
  }

  createTask(): ITask {
    return {
      id: uuidv4(),
      label: null,
      checked: false,
      focus: true,
    };
  }

  createStep(id: string) {
    const index = this.tasks.findIndex((task) => task.id == id);

    const tempTasks = this.tasks.map((task) => ({
      ...task,
      focus: false,
    }));

    const newElement = this.createTask();
    tempTasks.splice(index + 1, 0, newElement);
    this.setLastCreated(newElement.id);
    this.setTasks(tempTasks);

    this.#handleOnFocus(newElement.id);
  }

  deleteStep(id: string) {
    if (this.tasks.length === 1) return this.setTasks([this.createTask()]);
    const newTasks = this.tasks.filter((task) => task.id !== id);
    this.setTasks(newTasks);
  }

  handleOnChange(id: string, value: Nullable<string>) {
    const index = this.#findIndex(id);

    const tempTasks = Array.from(this.tasks);
    tempTasks[index].label = value;
    this.setTasks(tempTasks);
  }

  handleOnKeyUp(id: string, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === KeysEnum.ENTER) {
      return this.createStep(id);
    }

    if (event.key === KeysEnum.BACKSPACE) {
      this.#onKeyBackspace(id);
    }
  }

  #onKeyBackspace(id: string) {
    const index = this.#findIndex(id);
    if (!index) return;

    const element = this.tasks[index] as ITask;

    if (!element.label?.length && element.label !== null)
      return this.handleOnChange(id, null);

    if (element.label === null) {
      this.deleteStep(id);

      const getLastId = this.tasks[index - 1].id;
      this.#handleOnFocus(getLastId);
    }
  }

  toggleCheckbox(id: string) {
    const index = this.tasks.findIndex((task) => task.id == id);
    const tasks = Array.from(this.tasks);
    tasks[index].checked = !tasks[index].checked;
    this.setTasks(tasks);
  }

  #findIndex(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    return index;
  }

  clear() {
    this.tasks = [this.createTask()];
    this.idLastCreated = null;
  }
}

export const events = new Events();
