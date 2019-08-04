import { codeCallWithContext } from './utils';
import { SerializeAble, ExtensionType, IExtensionManifest, IExtensionLifeCycle } from './interface';
export * from './interface';

class AbstractExtension<T, U> implements SerializeAble {
  private readonly type: ExtensionType;
  private readonly manifest: IExtensionManifest;

  constructor(
    type: ExtensionType,
    manifest: IExtensionManifest,
    private extensionLifeCycle: IExtensionLifeCycle<T, U>
  ) {
    this.type = type;
    this.manifest = manifest;
  }

  serialize() {
    return {
      type: this.type,
      manifest: this.manifest,
      init: codeCallWithContext(this.extensionLifeCycle.init),
      run: codeCallWithContext(this.extensionLifeCycle.run),
      afterRun: codeCallWithContext(this.extensionLifeCycle.afterRun),
      destroy: codeCallWithContext(this.extensionLifeCycle.destroy),
    };
  }
}

export class TextExtension<T = string> extends AbstractExtension<T, string> {
  constructor(manifest: IExtensionManifest, methods: IExtensionLifeCycle<T, string>) {
    super(ExtensionType.Text, manifest, methods);
  }
}

export class ToolExtension<T = string> extends AbstractExtension<T, string> {
  constructor(manifest: IExtensionManifest, methods: IExtensionLifeCycle<T, string>) {
    super(ExtensionType.Tool, manifest, methods);
  }
}

export interface ImageExtensionData {
  dataUrl: string;
  width: number;
  height: number;
}

export class ImageExtension<T = string> extends AbstractExtension<T, ImageExtensionData> {
  constructor(manifest: IExtensionManifest, methods: IExtensionLifeCycle<T, ImageExtensionData>) {
    super(ExtensionType.Image, manifest, methods);
  }
}
