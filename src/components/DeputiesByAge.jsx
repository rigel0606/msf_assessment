import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function DeputiesByAge() {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [colDefs, setColDefs] = useState([
        {
            field: "calendar_year",
            headerName: "Calendar year"
        },
        {
            field: "indicator_type",
            headerName: "Indicator type"
        },
        {
            field: "21-29",
            headerName: "21-29"
        },
        {
            field: "30-39",
            headerName: "30-39"
        },
        {
            field: "40-49",
            headerName: "40-49"
        },
        {
            field: "50-59",
            headerName: "50-59"
        },
        {
            field: "60-69",
            headerName: "60-69"
        },
        {
            field: "70-79",
            headerName: "70-79"
        },
        {
            field: "80_and_above",
            headerName: "80 and above"
        },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            filter: true
        }
    })

    useEffect(() => {
        getDeputiesByAge();
    }, [])

    const onGridReady = useCallback((params) => {
        params.api.sizeColumnsToFit();
    }, []);

    const dataset_id = "d_bc5b61d5165e43bcf38e22c9e8212b3f";
    const url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + dataset_id;

    const getDeputiesByAge = async () => {
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