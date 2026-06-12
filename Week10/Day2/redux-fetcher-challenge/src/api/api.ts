// A highly flexible generic fetch module parsing endpoint strings safely
export const fetchDataFromApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return (await response.json()) as T;
};