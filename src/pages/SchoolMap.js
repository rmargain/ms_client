import { useState, useEffect } from "react";
import ReactMapGl, { Marker, NavigationControl, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { Row, Col, Typography, Button, Carousel, Modal } from "antd";
import { BankTwoTone } from "@ant-design/icons";
import { getAllSchools } from "../services/school";
import SchoolCard from "../components/school/SchoolCard.js";
import { Link } from "react-router-dom";
import { useAuthInfo } from "../hooks/authContext";
import StudentApplication from "../components/application/ApplicationForm";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function SchoolMap() {
  const { user } = useAuthInfo();
  const [coords, setCoords] = useState([-99.1332, 19.4326]);
  const [allSchools, setAllSchools] = useState(null);
  const [selectedSchool, setselectedSchool] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: coords[1],
    longitude: coords[2],
    width: "100%",
    heigth: "500px",
    zoom: 13,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((result) => {
        setCoords([result.coords.longitude, result.coords.latitude]);
      });
    }
  }, [navigator.geolocation]);

  useEffect(() => {
    setViewport({
      latitude: coords[1],
      longitude: coords[0],
      width: "95%",
      height: "70vh",
      zoom: 13,
    });
  }, [coords]);

  useEffect(async () => {
    const { data } = await getAllSchools();
    setAllSchools(data.schools);
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Typography.Title level={3}>Seach Schools Near Me</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24}>
          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            title={selectedSchool ? selectedSchool.name : null}
          >
            <SchoolCard
              style={{ width: "90vw", padding: "15px" }}
              school={selectedSchool}
            />
            {user ? (
              <Button
                className="quick-apply-button"
                s
                hape="round"
                onClick={() => {
                  setIsModal2Visible(true);
                  setIsModalVisible(false);
                }}
              >
                Quick Apply Free!
              </Button>
            ) : (
              <Button disabled className="quick-apply-button" shape="round">
                <Link to="/login">Login to Apply!</Link>
              </Button>
            )}
          </Modal>

          <Modal
            visible={isModal2Visible}
            footer={null}
            onCancel={() => setIsModal2Visible(false)}
            title={selectedSchool ? selectedSchool.name : null}
          >
            <StudentApplication
              selectedSchool={selectedSchool}
              setIsModal2Visible={setIsModal2Visible}
            />
          </Modal>

          <ReactMapGl
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            mapStyle="mapbox://styles/robertomargain/cklx6uv1g01cb17lhikbi2c4g"
            onViewportChange={(viewport) => setViewport(viewport)}
          >
            <NavigationControl style={{ left: 10, top: 10 }} />
            {allSchools
              ? allSchools.map((school, index) => (
                  <>
                    <Marker
                      key={school._id}
                      latitude={school.location.coordinates[1]}
                      longitude={school.location.coordinates[0]}
                    >
                      <Button
                        className="map-school-button"
                        shape="circle"
                        onClick={(e) => {
                          e.preventDefault();
                          setselectedSchool(school);
                          setIsModalVisible(true);
                        }}
                        icon={
                          <BankTwoTone
                            style={{ fontSize: "1em" }}
                            twoToneColor="#33393d"
                          />
                        }
                      ></Button>
                    </Marker>
                  </>
                ))
              : null}
          </ReactMapGl>
        </Col>
      </Row>
    </>
  );
}

export default SchoolMap;
