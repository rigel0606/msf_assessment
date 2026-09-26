import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-1 fw-bold">404</h1>

      <h2 className="mb-3">Page Not Found</h2>

      <p className="text-muted mb-4">
        Sorry, the page you are looking for does not exist.
      </p>

      <Button as={Link} to="/" variant="primary">
        Back to Home
      </Button>
    </Container>
  );
}
