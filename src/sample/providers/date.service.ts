/**
 * date.service.ts 文件用途：提供日期处理相关的服务。
 * 本服务类包含静态方法 format，用于将传入的日期字符串转换为本地化的日期时间字符串格式。
 *
 * 该服务类展示了如何在应用中实现通用的日期处理逻辑，例如格式化日期。
 * 可以根据需要扩展更多日期处理功能，如解析、比较等。
 */

export class DateService {
  /**
   * 将传入的日期字符串格式化为本地化的日期时间字符串。
   * @param value 日期字符串，应符合 Date 构造函数可接受的格式。
   * @returns 格式化后的本地化日期时间字符串。
   */
  public static format(value: string): string {
    return new Date(value).toLocaleString();
  }

  /* // 使用 dayjs 库进行日期格式化的示例
  public static FORMAT(value: ConfigType) {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
  }
  */
}
