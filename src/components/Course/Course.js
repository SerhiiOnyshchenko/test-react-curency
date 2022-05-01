import React, { Component } from 'react';
import { nanoid } from 'nanoid';

class Course extends Component {
   state = { articles: [] };

   render() {
      const {
         currencyOptions,
         selectCurrency,
         onChangeAmount,
         onChangeCurrency,
         amount,
      } = this.props;
      return (
         <div className="box">
            <input
               type="number"
               value={amount ? amount : 1}
               onChange={onChangeAmount}
            />
            <select value={selectCurrency} onChange={onChangeCurrency}>
               {currencyOptions.map(option => (
                  <option key={nanoid(5)} value={option}>
                     {option}
                  </option>
               ))}
            </select>
         </div>
      );
   }
}

export default Course;
