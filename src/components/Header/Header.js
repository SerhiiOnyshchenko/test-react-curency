const Header = ({ infoResultUSD, infoResultEUR }) => {
   return (
      <header className="toolbar" role="banner">
         <table>
            <thead>
               <tr>
                  <th>Currency</th>
                  <th>Rate</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>USD</td>
                  <td className="td-number">{infoResultUSD}</td>
               </tr>
               <tr>
                  <td>EUR</td>
                  <td className="td-number">{infoResultEUR}</td>
               </tr>
            </tbody>
         </table>
      </header>
   );
};

export default Header;
