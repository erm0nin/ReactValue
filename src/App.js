import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("EUR");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  const [rates, setRates] = React.useState({});
  const [oneParm, setOneParm] = React.useState(90);
  const [twoParm, setTwoParm] = React.useState(2);
  React.useEffect(() => {
    fetch(
      "https://api.currencyapi.com/v3/latest?apikey=cur_live_0TqtetZWxKX4aQPY6bxWKhNSbvpjgFHv74uru276&currencies=EUR%2CUSD%2CGBP%2CRUB"
    )
      .then((res) => res.json())
      .then((json) => {
        setRates(json.data);
        console.log(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("no");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / oneParm;
    const resut = price * twoParm;
    setFromPrice(value);
    setToPrice(resut);
  };

  const onChangeToPrice = (value) => {
    setToPrice(value);
  };
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        onChangeCurrency={setToCurrency}
        value={toPrice}
        currency={toCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
