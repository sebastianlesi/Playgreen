import axios from "axios";

export const getRequestListSports = () => {
    return axios({
      method: "GET",
      url: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`,
      baseURL: process.env.REACT_APP_API_URL_SPORTS,
    });
  };