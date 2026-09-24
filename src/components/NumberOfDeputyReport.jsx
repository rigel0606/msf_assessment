import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function NumberOfDeputyReport() {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [colDefs, setColDefs] = useState([
        {
            field: "year",
            headerName: "Year"
        },
        {
            field: "drs_received",
            headerName: "Deputy Reports (DR) received"
        }
    ]);

    const defaultColDef = useMemo(() => {
        return {
            filter: true
        }
    })

    useEffect(() => {
        getNumberOfDeputyReport();
    }, [])

    const onGridReady = useCallback((params) => {
        params.api.sizeColumnsToFit();
    }, []);

    const datasetId = "d_e66a99d9a457360fd6a95de5a7ccf1ed";
    const url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + datasetId; 

    const getNumberOfDeputyReport = async () => {
        try {
            const response = await axios.get(url);
            setRowData(response.data.result.records);
            setLoading(false);
        } catch (error) {
            console.error("Fail to fetch data", error);
        }
    };

    return (
        <div style={{ height: '60vh', minHeight: '400px', width: '100%' }}>
            {loading ? (<h3>loading...</h3>) 
            : (
                <AgGridReact 
                    rowData={rowData} 
                    columnDefs={colDefs}
                    onGridReady={onGridReady}
                    defaultColDef={defaultColDef}
                />
            )}
        </div>
    );
}