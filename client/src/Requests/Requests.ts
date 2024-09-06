const generateQueryString = (params: {
  [key: string]: string | number | boolean | undefined;
}): string => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};

export const OCEAN_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type Methods = (typeof OCEAN_METHODS)[keyof typeof OCEAN_METHODS];

type RequestParams = {
  path: string;
  method: Methods;
  body?: { [key: string]: any };
  token: string;
  query?: { [key: string]: string | number | boolean | undefined };
};

export const baseOceanRequest = async <T>(
  params: RequestParams
): Promise<T> => {
  const { path, method, body, token, query = {} } = params;

  const queryString = generateQueryString(query);

  try {
    const request = new Request(`http://localhost:3001${path}${queryString}`, {
      method,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      body: body && JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} - ${response.statusText}`
      );
    }

    const parsedData = await response.json();

    return parsedData;
  } catch (error) {
    const cause = `An error occurred while ${method}ing ${path}`;
    const msg = (error as any)?.message || cause;
    throw new Error(msg, {
      cause: cause,
    });
  }
};
