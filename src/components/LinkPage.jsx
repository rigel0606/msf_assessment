import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

export default function LinkPage() {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Useful Links</h1>

      <p className="text-muted mb-4">
        Useful resources related to deputy reports and official Singapore
        government data.
      </p>

      <ListGroup className="mb-4">
        <ListGroup.Item>
          <a
            href="https://data.gov.sg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            data.gov.sg
          </a>

          <p className="mb-0 text-muted">
            Singapore Government open data platform.
          </p>
        </ListGroup.Item>

        <ListGroup.Item>
          <a
            href="https://www.msf.gov.sg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministry of Social and Family Development
          </a>

          <p className="mb-0 text-muted">
            Official Ministry of Social and Family Development website.
          </p>
        </ListGroup.Item>
      </ListGroup>

      <Button as={Link} to="/" variant="primary">
        Back to Home
      </Button>
    </Container>
  );
}
