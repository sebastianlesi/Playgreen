import axios from "axios";

export const getRequestListSports = () => {
    return axios({
      method: "GET",
      url: `json/3/search_all_teams.php?s=Soccer&c=Spain`,
      baseURL: process.env.REACT_APP_API_URL_SPORTS,
    });
  };