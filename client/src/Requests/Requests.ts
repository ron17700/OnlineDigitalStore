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
};

export const baseOceanRequest = async <T>(
  params: RequestParams
): Promise<T> => {
  const { path, method, body, token } = params;

  try {
    const request = new Request(`http://localhost:3001${path}`, {
      method,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      body: body && JSON.stringify(body),
    });

    const data = await fetch(request);
    const parsedData = await data.json();

    return parsedData;
  } catch (error) {
    const cause = `An error occurred while ${method}ing ${path}`;
    const msg = (error as any)?.message || cause;
    throw new Error(msg, {
      cause: cause,
    });
  }
};
