import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const ExternalApiComponent = () => {
  const { apiOrigin = "http://localhost:5001", audience } = getConfig();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const { getAccessTokenWithPopup, getAccessTokenSilently, user } = useAuth0(); //getAccessTokenWithPopup se usa con MFA y getAccessTokenSilently sin MFA
  console.log("Aud : " + audience);
  const callApi = async () => {
    try {
      const token = await getAccessTokenWithPopup({
        audience: audience,
        scope: "read:billing",
      });

      console.log("Token : " + token);
      const response = await fetch(`${apiOrigin}/billing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  return (
    <>
      <div className="mb-5">
        <h1>Datos de pago</h1>
        <p className="lead">
          Nota: El primer método de pago que añadas debe ser una tarjeta de
          crédito o de débito. Después de añadir una tarjeta, puedes añadir
          otros métodos de pago, como cuentas bancarias.
        </p>
        <p>
          Los datos introducidos en está sección están protegidos con un MFA.
          Presione la opción para mostrar sus datos.
        </p>

        <Button
          color="primary"
          className="mt-5"
          onClick={callApi}
          disabled={!audience}
        >
          Mostrar TDC/TDB
        </Button>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
