export interface ApiHeader {
  Authorization?: string;
  "Content-type": string;
}

export type Body = Record<string, unknown>;
export type DefaultResponse = Record<string, unknown>;

export interface OptionsArgs extends Record<string, unknown> {
  body?: Body;
  method?: "GET" | "POST" | "DELETE" | "PATCH";
  headers?: Record<string, unknown>;
}
