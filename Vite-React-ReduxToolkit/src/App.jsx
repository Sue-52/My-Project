import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "./store/action-creators/counterCreator";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  return (
    <div>
      <h1>App Page</h1>
      <h3>Number: {count}</h3>
      <div>
        <button onClick={() => dispatch(increment())}> +1 </button>
        <button onClick={() => dispatch(decrement())}> -1 </button>
        <input
          type="text"
          onKeyUp={(e) => {
            if (e.code === "Enter")
              return dispatch(incrementByAmount(Number(e.target.value)));
          }}
        />
      </div>
    </div>
  );
}

export default App;
