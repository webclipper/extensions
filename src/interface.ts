import TurndownService from 'turndown';
import { IHighlighter } from '@web-clipper/highlight';
import { IAreaSelector } from '@web-clipper/area-selector';
import * as antd from 'antd';
import React from 'react';

export interface InitContext {
  accountInfo: {
    type?: string;
  };
  url?: string;
  locale: string;
  pathname: string;
  currentImageHostingService?: {
    type: string;
  };
}

export interface ContentScriptContext {
  $: JQueryStatic;
  locale: string;
  turndown: TurndownService;
  Highlighter: Type<IHighlighter>;
  AreaSelector: Type<IAreaSelector>;
  toggleClipper: () => void;
  Readability: any;
  document: Document;
  QRCode: any;
}

export interface Message {
  info(content: string): void;
}

export interface UploadImageRequest {
  data: string;
}

export interface ImageHostingService {
  getId(): string;

  uploadImage(request: UploadImageRequest): Promise<string>;

  uploadImageUrl(url: string): Promise<string>;
}

interface CopyToClipboardOptions {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
}

export interface ToolContext<T, Out> {
  locale: string;
  result: T;
  data: Out;
  message: Message;
  imageService?: ImageHostingService;
  loadImage: any;
  captureVisibleTab: any;
  copyToClipboard: (text: string, options?: CopyToClipboardOptions) => void;
  createAndDownloadFile: (fileName: string, content: string | Blob) => void;
  antd: typeof antd;
  React: typeof React;
}

export interface IExtensionLifeCycle<T, U> {
  /**
   * 插件被加载之前
   */
  init?(context: InitContext): boolean;

  /**
   * 执行插件
   */
  run?(context: ContentScriptContext): Promise<T> | T;

  /**
   * 执行插件后
   */
  afterRun?(context: ToolContext<T, U>): Promise<U> | U;

  /**
   * 清理环境
   */
  destroy?(context: ContentScriptContext): void;
}

export interface IExtensionManifest {
  /**
   * 扩展名名
   */
  readonly name: string;
  /**
   * 版本号 a.b.c
   */
  readonly version: string;
  /**
   * 描述
   */
  readonly description?: string;
  /**
   * 图标地址
   */
  readonly icon?: string;
  /**
   * 匹配的网址列表，如果为空，则匹配全部网站。
   */
  readonly matches?: string[];

  readonly apiVersion?: string;
  /**
   * 关键字
   */
  readonly keywords?: string[];

  readonly i18nManifest?: {
    [key: string]: {
      readonly name?: string;
      readonly description?: string;
      readonly icon?: string;
      readonly keywords?: string[];
    };
  };
}

export enum ExtensionType {
  Text = 'Text',
  Image = 'Image',
  Tool = 'tool',
}

export interface SerializedExtension {
  type: ExtensionType;
  manifest: IExtensionManifest;
  init?: string;
  run?: string;
  afterRun?: string;
  destroy?: string;
}

export interface SerializeAble {
  serialize: () => SerializedExtension;
}

export interface SerializedExtensionWithId extends SerializedExtension {
  id: string;
  router: string;
  embedded: boolean;
}

export type SerializedExtensionInfo = Pick<SerializedExtensionWithId, 'type' | 'manifest' | 'id'>;

interface Type<T> extends Function {
  new (...args: any[]): T;
}
