import { IExtensionManifest } from './interface';

export function codeCallWithContext(plugin?: Function): undefined | string {
  if (!plugin) {
    return;
  }
  if (
    Object.prototype.toString.call(plugin) !== '[object Function]' &&
    Object.prototype.toString.call(plugin) !== '[object AsyncFunction]'
  ) {
    throw new TypeError('plugin must be function.');
  }
  return `(${plugin.toString()})(typeof(context) === 'undefined' ? {}:context);`;
}

export function getLocaleExtensionManifest(manifest: IExtensionManifest, locale: string) {
  const { i18nManifest, ...rest } = manifest;
  let localeManifest = {};
  if (i18nManifest && typeof i18nManifest === 'object') {
    localeManifest = i18nManifest[locale];
  }
  return {
    ...rest,
    ...localeManifest,
  };
}
