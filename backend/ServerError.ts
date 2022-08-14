export class ServerError {
  constructor(
    public code: number = 500,
    public message: string = "internal server error"
  ) {
    this.code = code;
    this.message = message;
  }
}
