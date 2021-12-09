import React from "react";
import { Container, Row, Col } from "reactstrap";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-0">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p>
            <img
              src="https://www.kindpng.com/picc/m/49-498443_transparent-email-icons-png-email-icon-light-blue.png"
              width="25"
            />
            {user.email}
          </p>
          <p>
            <img
              src="https://image.pngaaa.com/199/2537199-middle.png"
              width="25"
            />
            {user.birthdate}
          </p>
        </Col>
        <Col md></Col>
      </Row>
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}></Col>
        <Col md>
          <p>
            <h4>Apellido:</h4>
            {user.family_name}
          </p>
          <p>
            <h4>Alias:</h4>
            {user.nickname}
          </p>
          <p>
            <h4>Ultima actualización:</h4>
            {user.updated_at}
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
