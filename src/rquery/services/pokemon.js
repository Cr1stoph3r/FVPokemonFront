import { toQueryString } from "../../utils/utils";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPokemoList = async (data) => {
  let url = `${API_URL}pokemon/list`;
  try {
    if (Object.keys(data).length) {
        url = `${url}?${toQueryString(data)}`;
    }  
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

export const fetchPokemonWithEvolutions = async (pokemonId) => {
  const url = `${API_URL}pokemon/${pokemonId}/with-evolutions`;
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
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};