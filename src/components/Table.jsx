import React, { useEffect, useState } from "react";
import "./../styles/Table.css";
import numeral from "numeral";

function Table({ countries }) {
  const [sorted, setSorted] = useState([]);
  useEffect(() => {
    if (countries.length > 0) {
      setSorted(countries.sort((a, b) => (a.cases >= b.cases ? -1 : 1)));
    }
  }, [countries]);

  return (
    <div className="table">
      {sorted.map((country) => (
        <tr>
          <td className="table__country">{country.country}</td>
          <td className="table__cases">
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
