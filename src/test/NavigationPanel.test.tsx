import { expect, test } from "vitest";
import NavigationPanel from "@/views/main/NavigationPanel";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./testUtils";

test("render NavigationPanel component", () => {
  renderWithProviders(<NavigationPanel isScrollUp={false} />);

  // search for an element that has the note content
  const elementByText = screen.getByText("DVD & BlueRay");
  expect(elementByText).toBeDefined(); //  tests whether the element argument of expect exists.

  // search for an element that has the data-testid
  const elementByDataTestId = screen.getByTestId("navigation-wrapper");
  expect(elementByDataTestId).toBeDefined();
});
