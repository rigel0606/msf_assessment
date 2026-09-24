import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NumberOfDeputyReport from "./NumberOfDeputyReport";
import DeputiesByAge from "./DeputiesByAge";

export default function Home() {
    return (
        <div>
            <Tabs
            defaultActiveKey="1"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="1" title="Deputies by Age">
                Deputies by Age
                <div>
                <DeputiesByAge />
                </div>
            </Tab>
            <Tab eventKey="2" title="Number of deputy reports">
                Number of deputy reports received by OPG
                <div>
                <NumberOfDeputyReport />
                </div>
            </Tab>
            <Tab eventKey="3" title="Contact" disabled>
                Tab content for Contact
            </Tab>
            </Tabs>
        </div>
    )
}