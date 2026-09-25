import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const DATASET_ID = "d_bc5b61d5165e43bcf38e22c9e8212b3f";
const API_URL = `https://data.gov.sg/api/action/datastore_search?resource_id=${DATASET_ID}`;

const columnDefs = [
  {
    field: "calendar_year",
    headerName: "Calendar Year",
  },
  {
    field: "indicator_type",
    headerName: "Indicator Type",
  },
  {
    field: "21-29",
    headerName: "21-29",
  },
  {
    field: "30-39",
    headerName: "30-39",
  },
  {
    field: "40-49",
    headerName: "40-49",
  },
  {
    field: "50-59",
    headerName: "50-59",
  },
  {
    field: "60-69",
    headerName: "60-69",
  },
  {
    field: "70-79",
    headerName: "70-79",
  },
  {
    field: "80_and_above",
    headerName: "80 and above",
  },
];

const defaultColDef = {
  flex: 1,
  filter: true,
  sortable: true,
  resizable: true,
};

export default function DeputiesByAge() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeputiesByAge = async () => {
      try {
        const response = await axios.get(API_URL);
        setRowData(response.data.result.records);
      } catch (error) {
        console.error("Failed to fetch deputies by age:", error);
        setError("Failed to load deputies by age.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeputiesByAge();
  }, []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  if (loading) {
    return <p>Loading deputies by age...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div
      style={{
        height: "60vh",
        minHeight: "400px",
        width: "100%",
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      />
    </div>
  );
}
