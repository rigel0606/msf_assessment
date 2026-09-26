import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function ActionOne() {
  return (
    <Container className="py-5 text-center">
      <div className="py-5">
        <h1 className="display-4 fw-bold mb-3">Coming Soon</h1>

        <p className="text-muted mb-4">
          This page is currently under development.
          <br />
          Please check back later.
        </p>

        <Button as={Link} to="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </Container>
  );
}
