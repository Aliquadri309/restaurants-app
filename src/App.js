import "./App.scss";
import RestaurantContainer from "./containers/restaurant-container/RestaurantContainer";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__header__title">Restaurants App</h1>
      </header>
      <div className="app__content">
        <RestaurantContainer />
      </div>
    </div>
  );
}

export default App;
