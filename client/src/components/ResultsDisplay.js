import React from 'react';

import './ResultsDisplay.css';

const ResultsDisplay = ({ results }) => {
    return (
      <div>
        <h3>Results Panel</h3>
        <table>
          <tbody>
            <tr>
              <th>Order</th>
              <th>Path</th>
            </tr>
            {results.map((path, i) => {
              return(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{path}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
}

export default ResultsDisplay;