import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from "numeral";
import { updateType } from "./../redux/actions/miscActions";
import { connect } from "react-redux";

function InfoBox({
  title,
  cases,
  total,
  type,
  style,
  casesColor,
  updateCurrType,
}) {
  return (
    <Card
      className="infobox"
      style={style}
      onClick={() => {
        updateCurrType(type);
      }}
    >
      <CardContent className="infoBox__cardContent">
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          <span>{title}</span>
        </Typography>

        {/* No of cases */}
        <Typography
          component={"div"}
          className="infoBox__cases"
          color="textSecondary"
        >
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

const mapDispatchToProps = {
  updateCurrType: updateType,
};

export default connect(null, mapDispatchToProps)(InfoBox);
