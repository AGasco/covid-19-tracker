import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from "numeral";

function InfoBox({
  title,
  cases,
  total,
  type,
  style,
  casesColor,
  setCurrType,
}) {
  return (
    <Card
      className="infobox"
      style={style}
      onClick={() => {
        setCurrType(type);
      }}
    >
      <CardContent className="infoBox__cardContent">
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          <span>{title}</span>
        </Typography>

        {/* No of cases */}
        <Typography className="infoBox__cases" color="textSecondary">
          <h2 style={{ color: casesColor }}>
            +
            {cases >= 1000
              ? numeral(cases).format("0.0a")
              : numeral(cases).format("0a")}
          </h2>
        </Typography>

        {/* No of deaths */}
        <Typography className="infoBox__total" color="textSecondary">
          <span>{numeral(total).format("0,0")} Total</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
