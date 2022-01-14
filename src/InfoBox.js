import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases,isRed,active,  total , ...props}) {
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
      <CardContent>
        {/*Title CoronaVirus Cases */}
        <Typography className="infoBox_title" color="textSecondary">{title}</Typography>

        {/*Number of Cases */}
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
        
        <Typography className="infoBox_total" color="textSecondary">{total} Total</Typography>
      </CardContent>

      {/*1.2 M Total Cases */}
    </Card>
  );
}

export default InfoBox;
