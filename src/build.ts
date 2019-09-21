import globby from 'globby';
import * as path from 'path';
import * as fs from 'fs';
import { SerializedExtension, SerializedExtensionInfo } from './interface';

(async () => {
  const extensionsDir = path.join(__dirname, './extensions');
  const outputDir = path.join(__dirname, '../extensions');
  const extensions = await globby(['**/*.js'], {
    cwd: extensionsDir,
  });
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const extensionList: SerializedExtensionInfo[] = [];
  extensions.forEach(f => {
    const extensionId = `${path.dirname(f)}/${path.basename(f).replace('.js', '')}`;
    const outPath = `${outputDir}/${extensionId}.json`;
    const extension = require(`${extensionsDir}/${f}`);
    const code: SerializedExtension = extension.default.serialize();
    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(outPath, JSON.stringify(code, null, 2));
    const { manifest, type } = code;
    extensionList.push({ manifest, type, id: extensionId });
  });
  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(extensionList, null, 2));
})();
