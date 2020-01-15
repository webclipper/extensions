import { ToolExtension } from '../../index';

export default new ToolExtension(
  {
    name: 'Douban Cover',
    icon: 'douban',
    version: '0.0.9',
    matches: ['https://movie.douban.com/subject/*'],
    i18nManifest: {
      'zh-CN': {
        name: '豆瓣封面',
        description: '下载豆瓣电影的封面',
      },
    },
  },
  {
    run: () => {
      const image = document
        .querySelector('#mainpic')!
        .querySelector('img')!
        .getAttribute('src');
      const imageUrl = image!.replace('s_ratio_poster', 'large').replace('.webp', '.jpg');
      const href = document.createElement('a');
      href.setAttribute('href', imageUrl);
      href.setAttribute('target', imageUrl);
      document.body.appendChild(href);
      href.click();
      document.body.removeChild(href);

      const title = document.querySelector('#content > h1 > span:nth-child(1)')!.textContent;
      return `${title}.jpg`;
    },
    afterRun: ({ copyToClipboard, result, data, antd }) => {
      antd.message.success('文件名已经复制到剪切板');
      copyToClipboard(result);
      return data;
    },
  }
);
