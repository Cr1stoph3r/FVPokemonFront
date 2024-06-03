const API_URL = import.meta.env.VITE_API_URL;

export const fetchTypesSelect = async () => {
  let url = `${API_URL}types/select`;
  try {
    let res = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
    }
    });
    if (res?.status === 200) {
      return res?.json();
    }

    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
}