export interface CustomerError extends Error {}

export class CustomError extends Error {
  status = 500;

  constructor(public message: string, status?: number) {
    super(message);

    this.status = status || 500;
  }
}
