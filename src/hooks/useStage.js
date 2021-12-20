import { useState } from "react";
import { createStage } from "../gameHelpers";

export const useStage = () => {
  const [stage, setStage] = useState(createStage());
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  return [stage, setStage, rows, setRows, level, setLevel];
};
