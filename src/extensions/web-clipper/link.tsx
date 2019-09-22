import { ToolExtension } from '../../index';

export default new ToolExtension(
  {
    name: 'Link',
    icon: 'link',
    version: '0.0.2',
    description: 'Add link at the end of the document.',
    i18nManifest: {
      'zh-CN': {
        name: '链接',
        description: '在文章末尾添加当前地址',
      },
    },
  },
  {
    run: async context => {
      return context.document.URL;
    },
    afterRun: async context => {
      return `${context.data} \n ${context.result}`;
    },
  }
);
