import *as Collections from  'typescript-collections';
export class AdminUtil {
  static alert(target, value, timeout) {
    target.clear();
    target = value;
    setTimeout(() => {
      target = '';
    }, timeout);
  }


}
