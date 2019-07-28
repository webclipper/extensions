import TurndownService from 'turndown';
import { IHighlighter } from '@web-clipper/highlight';
import { IAreaSelector } from '@web-clipper/area-selector';

export interface InitContext {
  accountInfo: {
    type?: string;
  };
  url?: string;
  pathname: string;
  currentImageHostingService?: {
    type: string;
  };
}

export interface ContentScriptContext {
  $: JQueryStatic;
  turndown: TurndownService;
  Highlighter: Type<IHighlighter>;
  AreaSelector: Type<IAreaSelector>;
  toggleClipper: () => void;
  Readability: any;
  document: Document;
  QRCode: any;
}
