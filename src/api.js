import NProgress from 'nprogress';
import axios from 'axios';
import {mockData} from './mock-data';

/**
 *
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const extractEvents = (events) => {
  var extractEvents = events.map((event) => event);
  var updatedEvents = [...new Set(extractEvents)];
  return updatedEvents;
};

// Task 4.4.
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`) // link was in task code
    .then((res) => res.json())
    .catch((error) => error.json())
  return result;
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    `https://16pqlknith.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}` // YOUR_GET_ACCESS_TOKEN_ENDPOINT/${encodeCode}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

export const getEvents = async (max_results = 32) => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData; // makes sure mock data is used when local host is used, when online google data is fetched via api
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return { events: JSON.parse(events).events, locations:   extractLocations(JSON.parse(events).events) };
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://www.googleapis.com/calendar/v3/calendars/ZnVsbHN0YWNrd2ViZGV2QGNhcmVlcmZvdW5kcnkuY29t/events/${token}`; //YOUR_GET_EVENTS_API_ENDPOINT/${token}
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};



// End of Task 4.4


export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        'https://16pqlknith.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url' //"YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;

}
