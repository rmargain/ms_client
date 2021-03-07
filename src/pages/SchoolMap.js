import {useState, useEffect} from 'react'
import ReactMapGl, { Marker, NavigationControl, Popup } from "react-map-gl";
import {Row, Col, Typography, Button, Carousel, Modal} from 'antd'
import {
  BankTwoTone,
} from "@ant-design/icons";
import {getAllSchools} from '../services/school'
import SchoolCard from '../components/school/SchoolCard.js'

function SchoolMap() {

const [coords, setCoords] = useState([-99.1332, 19.4326]);
const [allSchools, setAllSchools] = useState(null);
const [selectedSchool, setselectedSchool] = useState(null);
const [isModalVisible, setIsModalVisible] = useState(false);
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

  useEffect(async () =>{
    const {data} = await getAllSchools()
    setAllSchools(data.schools)
  },[])
  
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
                          >
                            <SchoolCard
                              style={{ width: "90vw", padding: "15px" }}
                              school={selectedSchool}
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
                          style={{ backgroundColor: "#be79aae" }}
                          shape="circle"
                          onClick={(e) => {
                            e.preventDefault();
                            setselectedSchool(school);
                            setIsModalVisible(true);
                          }}
                          icon={
                            <BankTwoTone
                              style={{ fontSize: "1em" }}
                              twoToneColor="#FF0000"
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

export default SchoolMap
