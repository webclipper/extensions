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
