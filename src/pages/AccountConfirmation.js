import { Typography, Row, Col, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { activateUser } from "../services/auth";

function AccountConfirmation({ match: { params }, history }) {
  const [usr, setUsr] = useState(null);
  useEffect(() => {
    async function getUser() {
      const { data } = await activateUser(params.confirmationCode)
      setUsr(data);
      if (data) {
        setTimeout(function () {
          history.push("/login");
        }, 5000);
      } else {
          setUsr('notfound')
      }
    }
 getUser()
    
  }, [params, history]);
 

  return (
    <div>
      {usr? (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={{ span: 24, offset: 8 }}>
            <Typography.Title className="confirm-text" level={1}>
              Activation Succesful!
            </Typography.Title>
            <Typography.Title className="confirm-text" level={4}>
              You will now be redirected to login page.
            </Typography.Title>
          </Col>
        </Row>
      ) : usr === "not found" ? (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={{ span: 24, offset: 8 }}>
            <Typography.Title className="confirm-text" level={1}>
              Ooops... Something went wrong!
            </Typography.Title>
            <Typography.Title className="confirm-text" level={4}>
              Please verify you email and try again.
            </Typography.Title>
          </Col>
        </Row>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default AccountConfirmation;
