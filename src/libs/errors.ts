export type ErrorTypes = 'info' | 'error' | 'question' | 'warning';

export default class AppError extends Error {
  type: ErrorTypes;

  constructor(type: ErrorTypes, message: string) {
    super(message);
    this.type = type;
  }
}
