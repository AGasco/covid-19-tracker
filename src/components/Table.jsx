import React, { useEffect, useState } from "react";
import "./../styles/Table.css";
import numeral from "numeral";
import { connect } from "react-redux";

function Table({ countries }) {
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    if (countries?.countries?.length > 0) {
      setSorted(
        countries.countries.sort((a, b) => (a.cases >= b.cases ? -1 : 1))
      );
    }
  }, [countries]);

  return (
    <div className="table">
      <table>
        <tbody>
          {sorted.map((country) => (
            <tr key={country.country}>
              <td className="table__country">{country.country}</td>
              <td className="table__cases">
                <strong>{numeral(country.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    countries: state.countries.countries,
  };
};

export default connect(mapStateToProps)(Table);
