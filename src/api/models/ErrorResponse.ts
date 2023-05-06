/**
 * Defines the structure of an error response returned by the server.
 */
export interface ErrorResponse {
  /** A message describing the error. */
  message: string;
  /** The HTTP status code associated with the error. */
  statusCode: number;
}
