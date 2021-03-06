export type BaseLevels = {
  error: 1,
  warn: 2,
  info: 3,
  log: 4,
  debug: 5,
  trace: 6,
}

export interface BaseLogger<L extends BaseLevels = BaseLevels> {
  /**
   * The name of this logger.
   */
  name: string

  (level: keyof L, message?: any, ...args: any[]): void
  (message?: any, ...args: any[]): void

  error(message?: any, ...args: any[]): void
  warn(message?: any, ...args: any[]): void
  info(message?: any, ...args: any[]): void
  log(message?: any, ...args: any[]): void
  debug(message?: any, ...args: any[]): void
  trace(message?: any, ...args: any[]): void
  enabledFor(level: keyof L): boolean
}

export type Logger<L extends BaseLevels = BaseLevels> = BaseLogger<L> & {
  [P in keyof Omit<L, keyof BaseLevels>]: (message?: any, ...args: any[]) => void
}

export interface AnyLogger<L extends BaseLevels, T extends BaseLogger<L> = Logger<L>> {
  /**
   * Returns an object containing all loggers created so far, keyed by name.
   */
  (): { [name: string]: T }

  /**
   * @param name The name of the new logger.
   * @param config An optional config object.
   * @returns A logger with the given `name` and `config`.
   */
  (name: string, config?: object | undefined): T

  /**
   * An object containing a mapping of level names to level values.
   */
  levels: L & { [name: string]: number }

  /**
   * Creates a new logger function that calls `anylogger.log` when invoked.
   *
   * @param name The name of the new logger.
   * @param config An optional config object.
   * @returns A new logger function with the given `name`.
   */
  new(name: string, config?: object | undefined): T

  /**
   * The log function used by `anylogger.new`.
   *
   * @param name The name of the logger to use
   * @param level The log level.
   * @param message The (formatted) message or any data to log.
   * @param args Additional log (formatting) arguments.
   */
  log(name: string, level: keyof L, message?: any, ...args: any[]): void

  /**
   * The log function used by `anylogger.new`.
   *
   * @param name The name of the logger to use
   * @param args The log arguments.
   * @param message The (formatted) message or any data to log.
   */
  log(name: string, message?: any, ...args: any[]): void

  /**
   * @param logger The logger that should be (re-)extended.
   * @return The logger that was given, extended.
   */
  ext(logger: T): T
}

declare const anylogger: AnyLogger<BaseLevels>;

export default anylogger;
