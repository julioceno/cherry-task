import React from 'react';
import { Tasks, SignIn, SignUp, ResourceNotImplemented } from '../pages';
import { Resources } from './resources';
import TaskIcon from '@mui/icons-material/Task';

export interface PrivateItem {
  name: string;
  label: string;
  pathname: string;
  icon: React.FC;
  publicRouter?: false;
  component: () => JSX.Element;
}

export interface PublicItem {
  name: string;
  label: string;
  pathname: string;
  publicRouter: true;
  component: () => JSX.Element;
}

export type Item = PrivateItem | PublicItem;

const menuItemsPrivate: PrivateItem[] = [
  {
    name: Resources.TASKS,
    label: 'Tarefas',
    pathname: '/tasks',
    icon: TaskIcon,
    component: Tasks,
  },
  {
    name: Resources.TASKS,
    label: 'Recurso não implementado',
    pathname: '/resource-not-implemented',
    icon: TaskIcon,
    component: ResourceNotImplemented,
  },
];

const menuItemsPublic: PublicItem[] = [
  {
    name: Resources.SIGNIN,
    label: 'Entrar',
    pathname: '/',
    component: SignIn,
    publicRouter: true,
  },
  {
    name: Resources.SIGNUP,
    label: 'Se cadastrar',
    pathname: '/sign-up',
    component: SignUp,
    publicRouter: true,
  },
];

const menuItems: Item[] = [...menuItemsPublic, ...menuItemsPrivate];

export { menuItems, menuItemsPrivate, menuItemsPublic };
