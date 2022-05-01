import React, { useEffect, useState } from 'react';
import Course from './Course/Course';
import Header from './Header/Header';

const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest';

const App = () => {
   const [currencyOptions, setCurrencyOptions] = useState([]);
   const [fromCurrency, setFromCurrency] = useState();
   const [toCurrency, setToCurrency] = useState();
   const [exchangeRate, setExchangeRate] = useState();
   const [amount, setAmount] = useState(1);
   const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
   const [infoResultUSD, setInfoResultUSD] = useState();
   const [infoResultEUR, setInfoResultEUR] = useState();

   let toAmount, fromAmount;
   if (amountInFromCurrency) {
      fromAmount = amount;
      toAmount = amount * exchangeRate;
   } else {
      toAmount = amount;
      fromAmount = amount / exchangeRate;
   }
   useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append('apikey', 'K7Ypu07GJJCN6vbQ91ZFQJPytOWh3yG9');

      var requestOptions = {
         method: 'GET',
         redirect: 'follow',
         headers: myHeaders,
      };
      fetch(BASE_URL, requestOptions)
         .then(res => res.json())
         .then(data => {
            const firstCurrency = Object.keys(data.rates)[0];
            setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
            setFromCurrency(data.base);
            setToCurrency(firstCurrency);
            setExchangeRate(data.rates[firstCurrency]);
         });
   }, []);
   useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append('apikey', 'K7Ypu07GJJCN6vbQ91ZFQJPytOWh3yG9');

      var requestOptions = {
         method: 'GET',
         redirect: 'follow',
         headers: myHeaders,
      };
      fetch(`${BASE_URL}?base=UAH&symbols=USD,EUR`, requestOptions)
         .then(res => res.json())
         .then(data => {
            setInfoResultUSD((1 / data.rates.USD).toFixed(2));
            setInfoResultEUR((1 / data.rates.EUR).toFixed(2));
         });
   }, []);

   useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append('apikey', 'K7Ypu07GJJCN6vbQ91ZFQJPytOWh3yG9');

      var requestOptions = {
         method: 'GET',
         redirect: 'follow',
         headers: myHeaders,
      };
      if (fromCurrency != null && toCurrency != null) {
         fetch(
            `${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`,
            requestOptions
         )
            .then(res => res.json())
            .then(data => {
               setExchangeRate(data.rates[toCurrency]);
            });
      }
   }, [fromCurrency, toCurrency]);

   function handelFromAmountChange(e) {
      setAmount(e.target.value);
      setAmountInFromCurrency(true);
   }
   function handelToAmountChange(e) {
      setAmount(e.target.value);
      setAmountInFromCurrency(false);
   }
   return (
      <div>
         <Header infoResultUSD={infoResultUSD} infoResultEUR={infoResultEUR} />
         <div className="converter">
            <h1>Currency converter</h1>
            <div>
               <Course
                  currencyOptions={currencyOptions}
                  selectCurrency={fromCurrency}
                  onChangeCurrency={e => setFromCurrency(e.target.value)}
                  onChangeAmount={handelFromAmountChange}
                  amount={fromAmount}
               />
               <div className="quer"></div>
               <Course
                  currencyOptions={currencyOptions}
                  selectCurrency={toCurrency}
                  onChangeCurrency={e => setToCurrency(e.target.value)}
                  onChangeAmount={handelToAmountChange}
                  amount={toAmount}
               />
            </div>
         </div>
      </div>
   );
};

export default App;
