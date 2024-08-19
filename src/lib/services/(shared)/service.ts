export type Success<T> = {
  success: true;
  data: T;
};

export type Error = {
  success: false;
  error: {
    message: string;
    statusCode: string | number;
  };
  data: null;
};

export abstract class Service {
  protected _handleResponse<T = unknown>(data: T): Success<T> {
    return {
      success: true,
      data,
    };
  }

  protected _handleError(error: string): Error {
    return {
      success: false,
      error: {
        message: error,
        statusCode: 500,
      },
      data: null,
    };
  }
}
