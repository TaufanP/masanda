import React from "react";
import { render } from "@testing-library/react-native";
import { Home } from "../src/screen";

test("Render Home properly", () => {
  const { debug } = render(<Home />);
  debug();
});
