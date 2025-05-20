const returnSeverity = (status: number): 'error' | 'warning' | 'info' | 'success' => {
  switch (status) {
    case 400:
      return "warning";
    case 500:
      return "error";
    default:
      return "error";  // Default da 'error' dönüyor
  }
};
export enum SeverityLevel {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}
export const StatusToSeverity: Record<number, SeverityLevel> = {
  400: SeverityLevel.Warning,
  500: SeverityLevel.Error,
  200: SeverityLevel.Success,
  401: SeverityLevel.Warning,
};
export type Method = "DELETE" | "POST" | "PUT" | "GET";
export const getOperationMessagesByStatus = (langPack: Record<string, string>): Record<Method, Record<number, string>> => ({
  DELETE: {
    200: langPack.delete_success,
    204: langPack.delete_success,
    400: langPack.delete_error,
    401: langPack.delete_unauthorized,
    500: langPack.delete_server_error,
  },
  POST: {
    200: langPack.post_success,
    201: langPack.post_success,
    400: langPack.post_error,
    401: langPack.post_unauthorized,
    500: langPack.post_server_error,
  },
  PUT: {
    200: langPack.put_success,
    204: langPack.put_success,
    400: langPack.put_error,
    401: langPack.put_unauthorized,
    500: langPack.put_server_error,
  },
  GET: {
    200: langPack.get_success,
    204: langPack.get_no_content,
    400: langPack.get_error,
    401: langPack.get_unauthorized,
    500: langPack.get_server_error,
  }
});
export default returnSeverity;