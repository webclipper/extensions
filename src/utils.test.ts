import * as assert from 'assert';
import { IExtensionManifest } from './interface';
import { getLocaleExtensionManifest } from './utils';

describe('test utils', () => {
  it('test getLocaleExtensionManifest', () => {
    const manifest: IExtensionManifest = { name: 'test', version: '0.0.1' };
    const localeExtensionManifest = getLocaleExtensionManifest(manifest, 'en-US');
    assert.deepEqual(localeExtensionManifest, { name: 'test', version: '0.0.1' });
  });

  it('test getLocaleExtensionManifest with i18nManifest', () => {
    const manifest: IExtensionManifest = {
      name: 'test',
      description: 'test',
      version: '0.0.1',
      i18nManifest: {
        'en-US': {
          name: 'test-en',
          description: 'test-en',
          keywords: ['test'],
        },
        'zh-CN': {
          name: 'test-zh',
        },
      },
    };

    assert.deepEqual(getLocaleExtensionManifest(manifest, 'en-US'), {
      name: 'test-en',
      version: '0.0.1',
      description: 'test-en',
      keywords: ['test'],
    });

    assert.deepEqual(getLocaleExtensionManifest(manifest, 'zh-CN'), {
      name: 'test-zh',
      version: '0.0.1',
      description: 'test',
    });

    assert.deepEqual(getLocaleExtensionManifest(manifest, 'jp-JP'), {
      name: 'test',
      version: '0.0.1',
      description: 'test',
    });
  });
});
