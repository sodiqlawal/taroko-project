import { env } from "@/config";
import axios, { AxiosRequestConfig } from "axios";
import { ApiHeader, OptionsArgs } from "@/types/client";

const { baseUrl } = env;

/** Axios interceptors to transform error message for clientFn */
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = error?.response?.headers?.message ?? "An error occurred! Please try again";

    return Promise.reject(err);
  },
);

export async function client<ResponseType>(
  endpoint: string,
  { body, method, headers: customHeaders, ...customConfig }: OptionsArgs = {},
): Promise<ResponseType> {

  const headers: ApiHeader = {
    "Content-type": "application/json; charset=UTF-8",
  };

  const params: AxiosRequestConfig = {
    method: method || (body ? "POST" : "GET"),
    ...customConfig,
    headers: {
      ...headers,
      ...customHeaders,
    },
  };

  if (body) params.data = JSON.stringify(body);

  let response: ResponseType;
  const { data } = await axios(`${baseUrl}/${endpoint}`, params);

  if (data?.data) {
    const { data: resolvedResponse } = data;
    response = resolvedResponse;
  } else {
    response = data;
  }

  return response;
}
