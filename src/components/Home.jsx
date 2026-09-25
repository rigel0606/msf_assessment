import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NumberOfDeputyReport from "./NumberOfDeputyReport";
import DeputiesByAge from "./DeputiesByAge";
import Container from "react-bootstrap/Container";

export default function Home() {
    return (
        <Container className="py-4"> 
            <Tabs
            defaultActiveKey="1"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="1" title="Deputies by Age">
                <h2 className="visually-hidden">Deputies by Age</h2>
                <DeputiesByAge />
            </Tab>
            <Tab eventKey="2" title="Number of deputy reports">
                <p className="text-muted mb-3">
                    Number of deputy reports received by OPG
                </p> 
                <NumberOfDeputyReport />
            </Tab>
            <Tab eventKey="3" title="Contact" disabled>
                Tab content for Contact
            </Tab>
            </Tabs>
        </Container>
    )
}