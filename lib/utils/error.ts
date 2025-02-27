import { TServerActionError } from '@/lib/types/common.types';

/**
 * Handles server action errors by returning an object with an error message and code, or throwing an error if specified.
 *
 * @param {string} [msg] - an optional string that represents a custom error message.
 * @param {any} [err] - an optional parameter that represents the error object.
 * @param {boolean} [isThrow=false] - a boolean flag set to false by default indicating whether to throw an error or return an object with error information.
 * @returns an object with a property "error" which has a value of type TServerActionError.
 */
export const handleActionError = (
  msg?: string,
  err?: any,
  isThrow: boolean = false
): TServerActionError | undefined => {
  const info = err?.message || '';
  const message = msg ? `${msg}. ${info}` : info;

  if (isThrow) throw new Error(message);

  return {
    success: false,
    error: { message, code: err?.code },
  };
};

type TSearchParams = {
  [key: string]: string | undefined;
};

/**
 * Takes in search parameters and an error code map, and returns the corresponding error message.
 *
 * @param {TSearchParams} searchParams - an interface that represents the search parameters.
 * @param errCodeMap - a `Map` object that maps error codes (numbers) to error messages (strings).
 * @returns the error message corresponding to the error code provided in the search parameters.
 */
export const getErrorMessageFromSearchParams = (
  searchParams: TSearchParams,
  errCodeMap: Map<number, string>
) => {
  const errCodeStr = searchParams.c;
  if (!errCodeStr) throw new Error('Invalid search params.');
  const errCodeNum = parseInt(errCodeStr);
  const isErrCodeExist = errCodeMap.has(errCodeNum);
  if (!isErrCodeExist) throw new Error('Invalid error code.');
  return errCodeMap.get(errCodeNum);
};
