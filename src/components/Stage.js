import React from "react";
import Cell from "./Cell";
import { SytledStage } from "./styles/StyleStage";

const Stage = ({ stage }) => (
  <SytledStage width={stage[0].length} height={stage.length}>
    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </SytledStage>
);

export default Stage;
