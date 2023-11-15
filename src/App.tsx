import "./App.css";
import { Body, Footer, Header, useFilterController } from "./components";

function App() {
  const filterController = useFilterController();

  return (
    <div>
      <Header {...filterController} />
      <Body />
      <Footer {...filterController} />
    </div>
  );
}

export default App;
