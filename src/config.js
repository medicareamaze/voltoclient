

import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  tiles as defaultTiles,
} from '@plone/volto/config';
import { FullView,FaqView } from './components';
export const settings = {
  ...defaultSettings,
};

export const views = {
  ...defaultViews,
  layoutViews: {
    ...defaultViews.layoutViews,
    full_view: FullView,
    faq_view: FaqView,
  },
};

export const widgets = {
  ...defaultWidgets,
};

export const tiles = {
  ...defaultTiles,
};
