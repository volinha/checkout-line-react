import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState(0);
  const [lines, setLines] = useState([
    [13, 45],
    [3, 6, 3, 18, 12],
    [12, 17, 10, 8],
    [4, 13, 26, 5],
    [11, 21, 8],
  ]);

  function addPersonToLine(e) {
    e.preventDefault(); // prevents the default react form event

    if(itemsInPersonCart <= 0) return 0; // prevents to submit a <= 0 value

    let leastItemsAmount = 1e10; // huge starter number to compare
    let lineWithLeast; // store the line with least (after comparing)

    for (let line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0); // sums the total of the line, if it doesn't have any, sets to zero

      if (totalInLine < leastItemsAmount) {
        // compare the values to geat the smallest line
        leastItemsAmount = totalInLine;
        lineWithLeast = line;
      }
    }

    setLines((prevLines) =>
      // map the lines, check if its the smallest line, if true, return the original line and push the new value, if false, just return the line
      prevLines.map((line) => (line === lineWithLeast ? [...line, itemsInPersonCart] : line))
    );

  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) => {
        //reduce the first element by one in each line every second
        return prevLines.map((line) => {
          // maps every line, reduces the first value by one
          // gets the rest of the line slicing out the old first value
          // filter the line from elements <= 0
          return [line[0] - 1, ...line.slice(1)].filter((value) => value > 0);
        });
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="App">
      <div>
        Digite a quantidade de produtos e clique em checkout e você será direcionado para a fila com
        menos itens!
      </div>
      <form onSubmit={addPersonToLine}>
        <input
          required
          className="input"
          type="number"
          value={itemsInPersonCart}
          onChange={(e) =>
            e.currentTarget.valueAsNumber >= 0
              ? setItemsInPersonCart(e.currentTarget.valueAsNumber)
              : 0
          }></input>
        <button className="button">Checkout</button>
      </form>
      <div className="lines">
        {lines.map((line, index) => (
          <div className="line" key={index}>
            {line.map((numberOfItems, index) => (
              <div key={index}>{numberOfItems}</div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
