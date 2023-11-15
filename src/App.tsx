import "./App.css";
import { useGetTopStoriesQuery } from "./redux/slices";
import { Header, useFilterController } from "./components";

function App() {
  const filterController = useFilterController();

  const { data, error, isLoading } = useGetTopStoriesQuery();

  console.log({ data, error, isLoading });

  return (
    <div>
      <Header {...filterController} />
    </div>
  );
}

export default App;
