export const getInfos = async (url) => {
  try {
    const response = await fetch("https://favz-api.herokuapp.com/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    if (response.status === 404) {
      throw new Error("Invalid URL");
    }
    if (response.status === 500) {
      throw new Error("Internal Error");
    }
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    return { error: error.message };
  }
};
