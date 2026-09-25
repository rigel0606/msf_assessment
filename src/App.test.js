import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

jest.mock("./components/NavBar", () => () => <nav>Navigation Bar</nav>);

jest.mock("./components/Home", () => () => <div>Home Page</div>);

jest.mock("./components/LinkPage", () => () => <div>Link Page</div>);

jest.mock("./components/NotFound", () => () => <div>Not Found Page</div>);

describe("App", () => {
  test("renders Home page for /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders LinkPage for /linkpage", () => {
    render(
      <MemoryRouter initialEntries={["/linkpage"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Link Page")).toBeInTheDocument();
  });

  test("renders NotFound for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Not Found Page")).toBeInTheDocument();
  });

  test("renders navigation bar", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Navigation Bar")).toBeInTheDocument();
  });
});
