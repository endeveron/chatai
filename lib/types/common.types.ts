export type TSearchParams = {
  [key: string]: string | undefined;
};

export type TWithChildren<T = {}> = T & { children?: React.ReactNode };

export type TServerActionResult<T = any> =
  | {
      success: true;
      data?: T;
    }
  | TServerActionError;

export type TServerActionError = {
  success: false;
  error: { code?: number; message: string };
};
