async function main() {
  const key = "5258|TsIJpgtnKVMZSWr1BqFgySAP1cidZ1WA";

  const data = getData();
  const requestResult = await request(data.coinOne, data.coinTwo, key);
  const makeCountResult = makeCount(data.valueCurrency, requestResult);
  showResult(data.coinOne, data.coinTwo, data.valueCurrency, makeCountResult);
}

function getData() {
  let coinOne = document.querySelector("#coinMain").value;
  let coinTwo = document.querySelector("#coinSeccond").value;
  let valueCurrency = document.querySelector("#currencyField").value;

  if (valueCurrency == 0) {
    valueCurrency = 1;
  }

  return { coinOne, coinTwo, valueCurrency };
}

async function request(coinOne, coinTwo, key) {
  console.log("Entrei na request");
  const currencyPair = `${coinOne}_${coinTwo}`;

  try {
    const response = await fetch(
      `https://api.invertexto.com/v1/currency/${coinOne}_${coinTwo}?token=${key}`
    );
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados da API");
    }

    const data = await response.json();
    const price = data[currencyPair].price;
    return price;
  } catch (error) {
    console.error("Erro na requisição | Bad Request:", error);
    throw error; // Rejoga o erro para que o chamador possa lidar com ele, se necessário
  }
}

function makeCount(valueCurrency, requestResult) {
  let result = valueCurrency * requestResult;
  result = result.toFixed(2);
  return result;
}

function showResult(coinOne, coinTwo, valueCurrency, result) {
  let iconCoinOne = document.querySelector("#iconCoinOne");
  let iconCoinTwo = document.querySelector("#iconCoinTwo");

  let nameCoinOne = document.querySelector("#nameCoinOne");
  let nameCoinTwo = document.querySelector("#nameCoinTwo");

  let showCoinOneResult = document.querySelector("#resultCoinOne");
  let showCoinTwoResult = document.querySelector("#resultCoinTwo");

  switch (coinOne) {
    case "BRL":
      console.log("BRL");
      iconCoinOne.setAttribute("src", "assets/BRL.png");
      nameCoinOne.innerHTML = "Real Brasileiro";
      showCoinOneResult.innerHTML = `R$ ${valueCurrency.toFixed(2)}`;
      break;
    case "EUR":
      console.log("EUR");
      iconCoinOne.setAttribute("src", "assets/EUR.png");
      nameCoinOne.innerHTML = "Euro";
      showCoinOneResult.innerHTML = `${valueCurrency.toFixed(2)} €`;
      break;
    case "USD":
      console.log("USD");
      iconCoinOne.setAttribute("src", "assets/USD.png");
      nameCoinOne.innerHTML = "Dolar Americano";
      showCoinOneResult.innerHTML = `US$ ${valueCurrency.toFixed(2)}`;
      break;
    case "GBP":
      console.log("GBP");
      iconCoinOne.setAttribute("src", "assets/GBP.png");
      nameCoinOne.innerHTML = "Libra Esterlina";
      showCoinOneResult.innerHTML = `£ ${valueCurrency.toFixed(2)}`;
      break;

    default:
      break;
  }

  switch (coinTwo) {
    case "BRL":
      console.log("BRL");
      iconCoinTwo.setAttribute("src", "assets/BRL.png");
      nameCoinTwo.innerHTML = "Real Brasileiro";
      showCoinTwoResult.innerHTML = `R$ ${result}`;
      break;
    case "EUR":
      console.log("EUR");
      iconCoinTwo.setAttribute("src", "assets/EUR.png");
      nameCoinTwo.innerHTML = "Euro";
      showCoinTwoResult.innerHTML = `${result} €`;
      break;
    case "USD":
      console.log("USD");
      iconCoinTwo.setAttribute("src", "assets/USD.png");
      nameCoinTwo.innerHTML = "Dolar Americano";
      showCoinTwoResult.innerHTML = `US$ ${result}`;
      break;
    case "GBP":
      console.log("GBP");
      iconCoinTwo.setAttribute("src", "assets/GBP.png");
      nameCoinTwo.innerHTML = "Libra Esterlina";
      showCoinTwoResult.innerHTML = `£ ${result}`;
      break;

    default:
      break;
  }
}
