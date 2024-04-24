import Quiz from "./components/Quiz/Quiz";
import { data } from "./constants";

function App() {
  return <Quiz questions={data.questions} />;
}

export default App;
