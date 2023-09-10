import { put, takeLatest } from "redux-saga/effects";

function* fetchAllSites() {
  try {
    const response = yield fetch("/api/sites");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const sites = yield response.json();

    yield put({ type: "SET_SITES", payload: sites });
  } catch (error) {
    console.log("All sites get request failed", error);
  }
}

function* fetchFilteredSites(action) {
  try {
    const response = yield fetch(
      `/api/sites/filtered?filters=${JSON.stringify(action.payload)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const filteredSites = yield response.json();

    yield put({ type: "SET_SITES", payload: filteredSites });
  } catch (error) {
    console.log("Filtered sites get request failed", error);
  }
}

function* fetchSitesColumns() {
  try {
    const response = yield fetch("/api/sites/columns");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const sitesColumns = yield response.json();

    yield put({ type: "SET_SITES_COLUMNS", payload: sitesColumns });
  } catch (error) {
    console.log("Sites columns get request failed", error);
  }
}

function* sitesSaga() {
  yield takeLatest("FETCH_ALL_SITES", fetchAllSites);
  yield takeLatest("FETCH_FILTERED_SITES", fetchFilteredSites);
  yield takeLatest("FETCH_SITES_COLUMNS", fetchSitesColumns);
}

export default sitesSaga;
