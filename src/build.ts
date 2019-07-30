import globby from 'globby';
import * as path from 'path';
import * as fs from 'fs';

(async () => {
  const extensionsDir = path.join(__dirname, './extensions');
  const outputDir = path.join(__dirname, '../extensions');
  const extensions = await globby(['**/*.js'], {
    cwd: extensionsDir,
  });
  const extensionList: any = [];
  extensions.forEach(f => {
    const outPath = `${outputDir}/${path.dirname(f)}/${path.basename(f).replace('js', 'json')}`;
    const extension = require(`${extensionsDir}/${f}`);
    const code = extension.default.serialize();
    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(outPath, JSON.stringify(code, null, 2));
    const { manifest, type } = code;
    extensionList.push({ manifest, type });
  });
  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(extensionList, null, 2));
})();
