import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import NumberOfDeputyReport from "../NumberOfDeputyReport";

jest.mock("axios");

jest.mock("ag-grid-react", () => ({
  AgGridReact: ({ rowData, columnDefs, defaultColDef }) => (
    <div data-testid="ag-grid">
      <div data-testid="row-count">{rowData.length}</div>

      <div data-testid="column-count">{columnDefs.length}</div>

      <div data-testid="first-row">
        {rowData.length > 0 ? JSON.stringify(rowData[0]) : "No data"}
      </div>

      <div data-testid="filter-enabled">
        {defaultColDef.filter ? "true" : "false"}
      </div>

      <div data-testid="sortable-enabled">
        {defaultColDef.sortable ? "true" : "false"}
      </div>

      <div data-testid="resizable-enabled">
        {defaultColDef.resizable ? "true" : "false"}
      </div>
    </div>
  ),
}));

describe("NumberOfDeputyReport", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state initially", () => {
    axios.get.mockReturnValue(new Promise(() => {}));

    render(<NumberOfDeputyReport />);

    expect(screen.getByText("Loading deputy reports...")).toBeInTheDocument();
  });

  test("loads and displays deputy reports", async () => {
    const mockRecords = [
      {
        year: "2024",
        drs_received: "150",
      },
      {
        year: "2023",
        drs_received: "135",
      },
    ];

    axios.get.mockResolvedValue({
      data: {
        result: {
          records: mockRecords,
        },
      },
    });

    render(<NumberOfDeputyReport />);

    await waitFor(() => {
      expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(screen.getByTestId("row-count")).toHaveTextContent("2");

    expect(screen.getByTestId("column-count")).toHaveTextContent("2");

    expect(screen.getByTestId("first-row")).toHaveTextContent("2024");

    expect(screen.getByTestId("first-row")).toHaveTextContent("150");
  });

  test("shows error message when API request fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    render(<NumberOfDeputyReport />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load deputy reports."),
      ).toBeInTheDocument();
    });
  });

  test("calls the correct API", async () => {
    axios.get.mockResolvedValue({
      data: {
        result: {
          records: [],
        },
      },
    });

    render(<NumberOfDeputyReport />);

    await waitFor(() => {
      expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_e66a99d9a457360fd6a95de5a7ccf1ed",
    );
  });

  test("handles empty API response", async () => {
    axios.get.mockResolvedValue({
      data: {
        result: {
          records: [],
        },
      },
    });

    render(<NumberOfDeputyReport />);

    await waitFor(() => {
      expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    });

    expect(screen.getByTestId("row-count")).toHaveTextContent("0");

    expect(screen.getByTestId("first-row")).toHaveTextContent("No data");
  });

  test("configures AG Grid correctly", async () => {
    axios.get.mockResolvedValue({
      data: {
        result: {
          records: [
            {
              year: "2024",
              drs_received: "150",
            },
          ],
        },
      },
    });

    render(<NumberOfDeputyReport />);

    await waitFor(() => {
      expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    });

    expect(screen.getByTestId("column-count")).toHaveTextContent("2");

    expect(screen.getByTestId("filter-enabled")).toHaveTextContent("true");

    expect(screen.getByTestId("sortable-enabled")).toHaveTextContent("true");

    expect(screen.getByTestId("resizable-enabled")).toHaveTextContent("true");
  });
});
