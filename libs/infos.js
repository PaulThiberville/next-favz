export const getInfos = async (url) => {
  try {
    const rawResponse = await fetch("https://favz-api.herokuapp.com/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
  } catch (error) {
    return { error: error.message };
  }
};
