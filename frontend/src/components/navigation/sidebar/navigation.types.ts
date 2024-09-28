import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ReactNode } from 'react';

export interface NavigationHeader {
  type: 'header';
  name: string;
  childs: NavigationItem[];
}

export interface NavigationItem {
  name: string;
  pathname: string;
  icon: string;
}

export type NavigationConfigItem = NavigationHeader | NavigationItem;
