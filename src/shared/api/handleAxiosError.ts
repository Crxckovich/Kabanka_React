import axios, { AxiosError } from "axios";

export type IAppError = {
  message: string;
  status?: number;
  code?: string;
  isAbort?: boolean;
};

export function handleAxiosError(error: unknown): IAppError {
  const defaultError: IAppError = {
    message: "Неизвестная ошибка сервера",
  };

  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string; code?: string }>;

    return {
      message:
        err.response?.data?.message ??
        err.message ??
        `Ошибка ${err.response?.status ?? "неизвестно"}`,
      status: err.response?.status,
      code: err.response?.data?.code,
    };
  }

  if (error instanceof Error) {
    console.log({ ...defaultError, message: error.message })
    return { ...defaultError, message: error.message };
  }

  console.log(defaultError)

  return defaultError;
}

export const getErrorMessage = (err: string | IAppError | undefined): string => {
  if (!err) return "";
  if (typeof err === "string") return err;
  return err.message || "Неизвестная ошибка сервера";
};
