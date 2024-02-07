/**
 * UtilService 提供了一组实用工具方法，用于执行常见的字符串和对象操作。
 * 包括模板字符串处理、移除对象中的未定义属性等功能，这些工具方法在处理文本格式化、
 * 数据清洗等场景中非常有用。通过集中这些实用功能，UtilService 旨在帮助开发者简化
 * 常见的编程任务，提高开发效率。
 */

import { Injectable } from '@nestjs/common';

// 定义模板参数类型，这里使用 any[] 以支持多种类型的参数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TemplateParameter = any[];

@Injectable()
export class UtilService {
  // 使用模板字符串和参数数组生成字符串，支持自定义分隔符
  public template<T>(templateData: TemplateStringsArray, param: T[], delimiter = '\n'): string {
    let output = '';
    // 遍历参数数组，将模板字符串与参数结合
    for (let i = 0; i < param.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      output += templateData[i] + param[i];
    }
    output += templateData[param.length];

    // 按行分割输出字符串，移除每行的开头空白，并重新组合
    const lines: string[] = output.split(/(?:\r\n|\n|\r)/);
    return lines
      .map((text: string) => text.replace(/^\s+/gm, ''))
      .join(delimiter)
      .trim();
  }

  // 生成预格式化文本，使用换行符作为默认分隔符
  public pre(templateData: TemplateStringsArray, ...param: TemplateParameter): string {
    return this.template(templateData, param, '\n');
  }

  // 生成单行文本，使用空格作为分隔符
  public line(templateData: TemplateStringsArray, ...param: TemplateParameter): string {
    return this.template(templateData, param, ' ');
  }

  // 移除对象中的未定义属性，返回一个没有未定义属性的新对象
  public removeUndefined<T extends object>(argv: T): Record<string, unknown> {
    // https://stackoverflow.com/questions/25421233
    // JSON.parse(JSON.stringify(args));
    return Object.fromEntries(Object.entries(argv).filter(([, value]: [string, unknown]) => value !== undefined));
  }
}
