import "./App.css";
import { useGetLatestStories } from "./api";
import { Body, Footer, Header, useFilterController } from "./components";

function App() {
  const filterController = useFilterController();

  const topStories = useGetLatestStories();

  console.log({ topStories });

  return (
    <div>
      <Header {...filterController} />
      <Body items={topStories.latestStories} />
      <Footer {...filterController} />
    </div>
  );
}

export default App;
