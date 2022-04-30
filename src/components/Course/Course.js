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
         <div>
            <input type="number" value={amount} onChange={onChangeAmount} />
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
