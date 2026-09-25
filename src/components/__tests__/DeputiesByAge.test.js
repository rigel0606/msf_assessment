import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import DeputiesByAge from "../DeputiesByAge";

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
    </div>
  ),
}));

describe("DeputiesByAge", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state initially", () => {
    axios.get.mockReturnValue(new Promise(() => {}));

    render(<DeputiesByAge />);

    expect(screen.getByText("Loading deputies by age...")).toBeInTheDocument();
  });

  test("loads and displays deputies data", async () => {
    const mockRecords = [
      {
        calendar_year: "2024",
        indicator_type: "Number",
        "21-29": "10",
        "30-39": "20",
        "40-49": "30",
        "50-59": "40",
        "60-69": "50",
        "70-79": "60",
        "80_and_above": "5",
      },
      {
        calendar_year: "2023",
        indicator_type: "Number",
        "21-29": "8",
        "30-39": "18",
        "40-49": "28",
        "50-59": "38",
        "60-69": "48",
        "70-79": "58",
        "80_and_above": "4",
      },
    ];

    axios.get.mockResolvedValue({
      data: {
        result: {
          records: mockRecords,
        },
      },
    });

    render(<DeputiesByAge />);

    await waitFor(() => {
      expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(screen.getByTestId("row-count")).toHaveTextContent("2");

    expect(screen.getByTestId("column-count")).toHaveTextContent("9");

    expect(screen.getByTestId("first-row")).toHaveTextContent("2024");

    expect(screen.getByTestId("filter-enabled")).toHaveTextContent("true");
  });

  test("shows error message when API request fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    render(<DeputiesByAge />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load deputies by age."),
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

    render(<DeputiesByAge />);

    await waitFor(() => {
      expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_bc5b61d5165e43bcf38e22c9e8212b3f",
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

    render(<DeputiesByAge />);

    await waitFor(() => {
      expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    });

    expect(screen.getByTestId("row-count")).toHaveTextContent("0");

    expect(screen.getByTestId("first-row")).toHaveTextContent("No data");
  });
});
