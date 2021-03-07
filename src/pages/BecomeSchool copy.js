import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  Input,
  Steps,
  Select,
  Upload,
  Image,
} from "antd";
import { useState, useEffect, useRef } from "react";
import { useAuthInfo } from "../hooks/authContext";
import MaskedInput from "antd-mask-input";
import { CountryRegionData } from "react-country-region-selector";
import ReactMapGl, { Marker, NavigationControl } from "react-map-gl";
import {
  PushpinTwoTone,
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { createSchool, uploadImages, deleteImage } from "../services/school";
import { Link } from "react-router-dom";

const { Step } = Steps;
const { Option } = Select;

function BecomeSchool() {
  const [form] = Form.useForm();
  const { user, setUser } = useAuthInfo();
  const [current, setCurrent] = useState(-1);
  const [status0, setStatus0] = useState("wait");
  const [status1, setStatus1] = useState("wait");
  const [status2, setStatus2] = useState("wait");
  const [status3, setStatus3] = useState("wait");
  const [regions, setRegions] = useState(null);
  const [coords, setCoords] = useState([-99.1332, 19.4326]);
  const [pointCoords, setPointCoords] = useState([-99.1332, 19.4326]);
  const [loading, setLoading] = useState(false);
  const [schoolInfo0, setSchoolInfo0] = useState(null);
  const [schoolInfo1, setSchoolInfo1] = useState(null);
  const [finalSchoolInfo, setFinalSchoolInfo] = useState(null);
  const [school, setSchool] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: coords[1],
    longitude: coords[2],
    width: "100%",
    heigth: "350px",
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
      width: "100%",
      height: "50vh",
      zoom: 13,
    });
  }, [coords]);

  useEffect(() => {
    setPointCoords([viewport.longitude, viewport.latitude]);
  }, [viewport]);

  const handleDrag = (e) => {
    setPointCoords(e.lngLat);
  };

  const handleSubmit = async (info) => {
    if (current === -1) {
      setCurrent(0);
      setStatus0("In Progress");
    } else if (current === 0) {
      setStatus0("Finished");
      setStatus1("In Progress");
      setSchoolInfo0(info);
      const newCurrent = current + 1;
      setCurrent(newCurrent);
    } else if (current === 1) {
      setStatus1("Finished");
      setStatus2("In Progress");
      const newCurrent = current + 1;
      setCurrent(newCurrent);
      setSchoolInfo1(info);
      const {
        street,
        extNum,
        intNum,
        city,
        country,
        region,
        zipcode,
        ...rest
      } = info;
      const address = {
        street,
        extNum,
        intNum,
        city,
        country,
        region,
        zipcode,
      };
      const lat = pointCoords[1];
      const lng = pointCoords[0];
      const schoolInfo = { ...schoolInfo0, address, lat, lng, ...rest };
      setFinalSchoolInfo(schoolInfo);
      console.log(finalSchoolInfo);
      const {
        data: { user, school },
      } = await createSchool(schoolInfo);
      setUser(user);
      setSchool(school);
    } else if (current === 2) {
      setStatus2("Finished");
      setStatus3("In Progress");
      const newCurrent = current + 1;
      setCurrent(newCurrent);
    }
  };

  const handleNext = () => {
    if (current === -1) {
      setCurrent(0);
      setStatus0("In Progress");
    } else if (current === 0) {
      setStatus0("Finished");
      setStatus1("In Progress");
      const newCurrent = current + 1;
      setCurrent(newCurrent);
    } else if (current === 1) {
      setStatus1("Finished");
      setStatus2("In Progress");
      const newCurrent = current + 1;
      setCurrent(newCurrent);
    } else if (current === 2) {
      setStatus2("Finished");
      setStatus3("In Progress");
      const newCurrent = current + 1;
      setCurrent(newCurrent);
    }
  };

  const handleLanguage1 = (e) => {
    console.log(e);
  };

  const handleCountry = (key) => {
    const splitRegions = () => {
      const regions = CountryRegionData[parseInt(key.key)][2].split("|");
      let res = [];
      let trueRes = [];
      for (let i = 0; i <= regions.length - 1; i++) {
        res.push([regions[i].split("~")]);
      }
      for (let i = 0; i <= res.length - 1; i++) {
        trueRes.push(res[i][0][0]);
      }
      setRegions(trueRes);
    };
    splitRegions();
  };

  const uploadButton = (
    <div style={{ display: "flex", alignItems: "center" }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginLeft: 8 }}>Upload</div>
    </div>
  );

  const handleUpload = async (file) => {
    setLoading(true);
    const fdata = new FormData();
    fdata.append("image", file);
    const { _id } = school;
    const { data: updatedSchool } = await uploadImages(fdata, _id);
    setSchool(updatedSchool);
    setLoading(false);
  };

  const handleDeleteImage = async (image) => {
    const {_id} = school
    console.log(image)
    console.log(_id)
    const {data} = await deleteImage(image, _id)
    setSchool(data)
  };

  return (
    <>
      <Typography.Title level={3}>School Application</Typography.Title>
      {current === -1 && !user.isSchool ? (
        <>
          <Typography.Title level={5}>
            Click "Begin" to onboard your first school{" "}
          </Typography.Title>
          <Button onClick={handleNext}>Begin</Button>
        </>
      ) : current === -1 && user.isSchool ? (
        <>
          <Typography.Title level={5}>
            Click "Begin" to add a new school{" "}
          </Typography.Title>
          <Button onClick={handleNext}>Begin</Button>
        </>
      ) : null}
      {current > -1 ? (
        <Steps
          current={current}
          size="small"
          progressDot
          onChange={(e) => setCurrent(e)}
          direction={
            window.innerWidth > 767 && window.screen.width > 767
              ? "horizontal"
              : "vertical"
          }
        >
          <Step progressDot title={status0} description="School Information" />
          <Step progressDot title={status1} description="Contact Information" />
          <Step progressDot title={status2} description="Image Upload" />
          <Step progressDot title={status3} description="Submit" />
        </Steps>
      ) : null}

      <Row gutter={[16, 16]}>
        {current === 0 ? (
          <Col xs={24} sm={24} md={{ span: 16, offset: 4 }}>
            <Form
              size="small"
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <div className="section0">
                <div className="section0-left">
                  <Form.Item name="name" label="School Name:" required>
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item
                    name="educationalMethod"
                    label="Education Method:"
                    required
                  >
                    <Select style={{ width: "100%" }} required>
                      <Option value="Montessori">Montessori</Option>
                      <Option value="Waldorf">Waldorf</Option>
                      <Option value="Self-directed">Self-Directed</Option>
                      <Option value="Reggio Emilia">Reggio Emilia</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="educationLevelMin"
                    label="Minimum Education Level:"
                  >
                    <Select style={{ width: "100%" }}>
                      <Option value={0}>Kinder 3 / Pre-First</Option>
                      <Option value={1}>Elementary - 1st</Option>
                      <Option value={2}>Elementary - 2nd</Option>
                      <Option value={3}>Elementary - 3rd</Option>
                      <Option value={4}>Elementary - 4th</Option>
                      <Option value={5}>Elementary - 5th</Option>
                      <Option value={6}>Middle School - 6th</Option>
                      <Option value={7}>Middle School - 7th</Option>
                      <Option value={8}>Middle School - 8th</Option>
                      <Option value={9}>High School - 9th</Option>
                      <Option value={10}>High School - 10th</Option>
                      <Option value={11}>High School - 11th</Option>
                      <Option value={12}>High School - 12th</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="educationLevelMax"
                    label="Maximum Education Level:"
                  >
                    <Select style={{ width: "100%" }}>
                      <Option value={0}>Kinder 3 / Pre-First</Option>
                      <Option value={1}>Elementary - 1st</Option>
                      <Option value={2}>Elementary - 2nd</Option>
                      <Option value={3}>Elementary - 3rd</Option>
                      <Option value={4}>Elementary - 4th</Option>
                      <Option value={5}>Elementary - 5th</Option>
                      <Option value={6}>Middle School - 6th</Option>
                      <Option value={7}>Middle School - 7th</Option>
                      <Option value={8}>Middle School - 8th</Option>
                      <Option value={9}>High School - 9th</Option>
                      <Option value={10}>High School - 10th</Option>
                      <Option value={11}>High School - 11th</Option>
                      <Option value={12}>High School - 12th</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="primaryEducationalLanguage"
                    label="Primary Educational Language:"
                    required
                  >
                    <Select
                      style={{ width: "100%" }}
                      onChange={(value) => handleLanguage1(value)}
                      required
                    >
                      <Option value="Spanish">Spanish</Option>
                      <Option value="English">English</Option>
                      <Option value="Portuguese">Portuguese</Option>
                      <Option value="French">French</Option>
                      <Option value="German">German</Option>
                      <Option value="Mandarin">Mandarin</Option>
                      <Option value="Cantonese">Cantonese</Option>
                      <Option value="Dutch">Dutch</Option>
                      <Option value="Hindi">Hindi</Option>
                      <Option value="Russian">Russian</Option>
                      <Option value="Japanese">Japanese</Option>
                      <Option value="Korean">Korean</Option>
                      <Option value="Arabic">Arabic</Option>
                      <Option value="Hebrew">Hebrew</Option>
                      <Option value="Greek">Greek</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="section0-right">
                  <Form.Item
                    name="secondaryEducationalLanguage"
                    label="Secondary Educational Language:"
                  >
                    <Select style={{ width: "100%" }}>
                      <Option value="Spanish">Spanish</Option>
                      <Option value="English">English</Option>
                      <Option value="Portuguese">Portuguese</Option>
                      <Option value="French">French</Option>
                      <Option value="German">German</Option>
                      <Option value="Mandarin">Mandarin</Option>
                      <Option value="Cantonese">Cantonese</Option>
                      <Option value="Dutch">Dutch</Option>
                      <Option value="Hindi">Hindi</Option>
                      <Option value="Russian">Russian</Option>
                      <Option value="Japanese">Japanese</Option>
                      <Option value="Korean">Korean</Option>
                      <Option value="Arabic">Arabic</Option>
                      <Option value="Hebrew">Hebrew</Option>
                      <Option value="Greek">Greek</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="tuition" label="Tuition:">
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item name="generalInfo" label="About the School:">
                    <Input.TextArea rows={8} />
                  </Form.Item>
                </div>
              </div>

              <Button type="primary" htmlType="submit" block size="small">
                Next
              </Button>
            </Form>
          </Col>
        ) : current === 1 ? (
          <Col xs={24} sm={24} md={{ span: 16, offset: 4 }}>
            <Form
              size="small"
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <div className="section1">
                <div className="section1-left">
                  <Form.Item
                    name="primaryContactName"
                    label="Contact Name:"
                    required
                  >
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item
                    name="primaryContactEmail"
                    label="Contact Email:"
                    required
                  >
                    <Input type="email" required />
                  </Form.Item>
                  <Form.Item
                    name="primaryContactPhone"
                    label="Contact Phone:"
                    required
                  >
                    <MaskedInput mask="(11)-111-111-1111" required />
                  </Form.Item>
                  <div>
                    <Typography>Address</Typography>
                    <Form.Item name="street" label="Street:" required>
                      <Input type="text" required />
                    </Form.Item>
                    <div className="address-numbers">
                      <Form.Item
                        className="number"
                        name="extNum"
                        label="Exterior No.:"
                      >
                        <Input type="text" />
                      </Form.Item>
                      <Form.Item
                        className="number"
                        name="intNum"
                        label="Interior No.:"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </div>
                  </div>
                  <Form.Item name="city" label="City:" required>
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item name="country" label="Country:" required>
                    <Select
                      onChange={(value, key) => handleCountry(key)}
                      required
                    >
                      {CountryRegionData.map((country, index) => (
                        <Option value={country[0]} key={index}>
                          {country[0]}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="region" label="Region/State:" required>
                    <Select>
                      {regions
                        ? regions.map((region, index) => (
                            <Option value={region} key={index}>
                              {region}
                            </Option>
                          ))
                        : null}
                    </Select>
                  </Form.Item>
                  <Form.Item name="zipcode" label="Zipcode:" required>
                    <Input type="text" required minLength={5} />
                  </Form.Item>
                </div>
                <div className="section1-right">
                  <div>
                    <Typography style={{ marginBottom: "10px" }}>
                      Drag the pin to your school location
                    </Typography>
                    <ReactMapGl
                      {...viewport}
                      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                      mapStyle="mapbox://styles/robertomargain/cklx6uv1g01cb17lhikbi2c4g"
                      onViewportChange={(viewport) => setViewport(viewport)}
                    >
                      <NavigationControl style={{ left: 10, top: 10 }} />
                      <Marker
                        latitude={pointCoords[1]}
                        longitude={pointCoords[0]}
                        draggable={true}
                        onDrag={handleDrag}
                      >
                        <PushpinTwoTone
                          style={{ fontSize: "3em" }}
                          twoToneColor="#FF0000"
                        />
                      </Marker>
                    </ReactMapGl>
                  </div>
                </div>
              </div>
              <Button type="primary" htmlType="submit" block size="small">
                Next
              </Button>
            </Form>
          </Col>
        ) : current === 2 ? (
          <>
            <Upload
              name="image"
              showUploadList={false}
              beforeUpload={handleUpload}
              listType="picture-card"
            >
              <div>{uploadButton}</div>
            </Upload>
            {school && school.images.length >= 1
              ? school.images.map((image, index) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "Column",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={image}
                      key={index}
                      width={150}
                      style={{
                        border: "1px solid blue",
                        margin: "15px",
                        padding: "15px",
                        height: "auto",
                      }}
                    />
                    <DeleteOutlined
                      onClick={() => handleDeleteImage(image)}
                      imgae={image}
                    />
                  </div>
                ))
              : null}
            <Button type="primary" onClick={handleNext} block size="small">
              Next
            </Button>
          </>
        ) : current === 3 ? (
          <div style={{display:'flex', flexDirection: 'column'}}>
            <Typography.Title level={2}>
              Congratulations you successfully registered your School.
            </Typography.Title>
            <Button type="primary"  size="small">
              <Link to="/my-schools"> Click to go to My Schools</Link>
            </Button>
          </div>
        ) : null}
      </Row>
    </>
  );
}

export default BecomeSchool;
