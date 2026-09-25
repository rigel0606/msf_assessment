import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const DATASET_ID = "d_e66a99d9a457360fd6a95de5a7ccf1ed";
const API_URL = `https://data.gov.sg/api/action/datastore_search?resource_id=${DATASET_ID}`;

const columnDefs = [
  {
    field: "year",
    headerName: "Year",
  },
  {
    field: "drs_received",
    headerName: "Deputy Reports (DR) received",
  },
];

const defaultColDef = {
  flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
};

export default function NumberOfDeputyReport() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(API_URL);
        setRowData(response.data.result.records);
      } catch (error) {
        console.error("Failed to fetch deputy reports:", error);
        setError("Failed to load deputy reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  if (loading) {
    return <p>Loading deputy reports...</p>;
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
