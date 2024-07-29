export const fetcher = async <TJson>(url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json() as Promise<TJson>;
};