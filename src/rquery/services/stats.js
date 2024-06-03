const API_URL = import.meta.env.VITE_API_URL;

export const fetchStatsSelect = async () => {
  let url = `${API_URL}stats/select`;
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