import { ToolExtension } from '../../index';

export default new ToolExtension(
  {
    name: 'Copy Iconfont Url',
    icon: 'iconfont',
    version: '0.0.1',
    description: 'Copy Iconfont Url in project page.',
    matches: ['https://www.iconfont.cn/manage/index'],
    i18nManifest: {
      'zh-CN': {
        name: '复制 Iconfont 代码链接',
        description: '在 Iconfont 项目页，复制当前项目的代码链接。',
      },
    },
  },
  {
    run: () => {
      const element = document.querySelector('#J_cdn_type_svgsymbol');
      if (element) {
        return element.textContent;
      }
      return null;
    },
    afterRun: ({ copyToClipboard, data, result, message }) => {
      if (!result) {
        message.info('Not found');
        return data;
      }
      copyToClipboard(`https:${result}`);
      message.info('Success');
      return data;
    },
  }
);
