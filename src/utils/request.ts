export default async function request(
  url: RequestInfo,
  options?: RequestInit | undefined
): Promise<any> {
  const result = await fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
  return result;
}
