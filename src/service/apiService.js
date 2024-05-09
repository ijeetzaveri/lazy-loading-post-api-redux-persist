const API_BASE_URL = "https://hn.algolia.com/api/v1";

export const getPosts = async (page) => {
  try {
    let response = await fetch(
      `${API_BASE_URL}/search_by_date?tags=story&page=${page}`
    );

    const data = await response.json();

    return data;
    // return {
    //   data: response?.hits ?? [],
    //   totalPages: response?.nbPages ?? 0,
    // };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
