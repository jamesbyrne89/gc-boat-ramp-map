import { useEffect, useCallback } from "react";
import Map from "./map/Map";
import SizeChart from "./size-chart/SizeChart";
import MaterialChart from "./material-chart/MaterialChart";
import SidePanel from "./side-panel/SidePanel";
import { useAppDispatch, useAppSelector } from "../hooks";
import ErrorState from "./error/ErrorState";
import LoadingSpinner from "./loading-spinner/LoadingSpinner";

import "./App.css";
import { loadData } from "../ducks/map";

function App() {
  const hasError = useAppSelector((state) => state.hasError);
  const isLoading = useAppSelector((state) => state.isLoading);
  const ramps = useAppSelector((state) => state.ramps);
  const dispatch = useAppDispatch();

  const fetchRamps = useCallback(async () => {
    dispatch({ type: "GET_RAMPS_REQUEST" });
    try {
      const res = await fetch("/api/ramps", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        dispatch({ type: "GET_RAMPS_ERROR" });
      } else {
        const data = await res.json();
        if (!data) {
          dispatch({ type: "GET_RAMPS_ERROR" });
          return;
        }
        dispatch(loadData(data));
      }
    } catch (err) {
      dispatch({ type: "GET_RAMPS_ERROR" });
    }
  }, [dispatch]);

  const resetFilters = () => {
    fetchRamps();
  };

  useEffect(() => {
    fetchRamps();
  }, [fetchRamps]);

  if (isLoading) {
    return (
      <div className="App">
        <div className="centered">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="App">
        <div className="centered">
          <ErrorState />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <main className="container">
        <Map />
        <SidePanel>
          <div className="chart-container">
            <SizeChart />
          </div>
          <div className="chart-container">
            <MaterialChart />
          </div>
          {ramps?.features.length !== ramps?.totalFeatures && (
            <button className="reset-btn" type="button" onClick={resetFilters}>
              Reset map
            </button>
          )}
        </SidePanel>
      </main>
    </div>
  );
}

export default App;
