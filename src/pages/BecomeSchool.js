import { Form, Typography, Col, Row, Button, Input, Steps, Select } from "antd";
import {useState} from "react";
import { useAuthInfo } from "../hooks/authContext";
import MaskedInput from 'antd-mask-input'
import {CountryRegionData} from 'react-country-region-selector'

const {Step} = Steps
const {Option} = Select
const CountryRegion = CountryRegionData

function BecomeSchool({history}) {

  const [form] = Form.useForm();
  const { user } = useAuthInfo();
const [current, setCurrent] = useState(-1)
const [status0, setStatus0] = useState("wait")
const [status1, setStatus1] = useState("wait");
const [status2, setStatus2] = useState("wait");
const [status3, setStatus3] = useState("wait");
const [selectedCountry, setSelectedCountry] = useState(null)
const [regions, setRegions] = useState(null)
const [language1, setLanguage1] = useState(null)
const [language2, setLanguage2] = useState(null)


  function handleSubmit(schoolInfo) {
    
  }

  const handleNext = () => {
      if (current === -1){
          setCurrent(0)
          setStatus0('In Progress')
      } else if ( current === 0){
          setStatus0('Finished')
          setStatus1('In Progress')
          const newCurrent = current +1
          setCurrent(newCurrent)
      } else if (current === 1){
          setStatus1('Finished')
          setStatus2("In Progress");
          const newCurrent = current + 1;
          setCurrent(newCurrent);
      } else if (current === 2){
          setStatus2("Finished");
          setStatus3("In Progress");
          const newCurrent = current + 1;
          setCurrent(newCurrent);
      } 
  }

  const handleLanguage1 = (e) => {
    console.log(e)
  }

  const handleCountry = (key) => {
          const splitRegions = () => {
          const regions = CountryRegionData[parseInt(key.key)][2].split("|");
          let res = []
          let trueRes = []
          for (let i = 0 ; i <= regions.length-1; i++){
          res.push([regions[i].split("~")])
        }
        for (let i=0 ; i<=res.length-1; i++){
            trueRes.push(res[i][0][0])
        }
          setRegions(trueRes)
    }
    splitRegions()
  }
  console.log(regions)
 

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
        >
          <Step progressDot title={status0} description="School Information" />
          <Step progressDot title={status1} description="Contact Information" />
          <Step progressDot title={status2} description="Image Upload" />
          <Step progressDot title={status3} description="Submit" />
        </Steps>
      ) : null}

      {current === 0 ? (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={{ span: 16, offset: 4 }}>
            <Form
              size="small"
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <div className="section0">
                <div className="section0-left">
                  <Form.Item name="name" label="School Name:">
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item name="educationalMethod" label="Education Method:">
                    <Select style={{ width: "100%" }}>
                      <Option value="Montessori">Montessori</Option>
                      <Option value="Waldorf">Waldorf</Option>
                      <Option value="Self-directed">Self-Directed</Option>
                      <Option value="Reggio Emilia">Reggio Emilia</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="educationalLevelMin"
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
                    name="educationalLevelMax"
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
                  >
                    <Select
                      style={{ width: "100%" }}
                      onChange={(value) => handleLanguage1(value)}
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
                  <Form.Item value="tuition" label="Tuition:">
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item value="generalInfo" label="About the School:">
                    <Input.TextArea rows={8} />
                  </Form.Item>
                </div>
              </div>

              <Button type="primary" onClick={handleNext} block size="small">
                Next
              </Button>
            </Form>
          </Col>
        </Row>
      ) : current === 1 ? (
        <>
          <Col>
            <div className="section1">
              <div className="section1-left">
                <Form.Item name="primaryContactName" label="Contact Name:">
                  <Input type="text" />
                </Form.Item>
                <Form.Item name="primaryContactEmail" label="Contact Email:">
                  <Input type="text" />
                </Form.Item>
                <Form.Item name="primaryContactPhone" label="Contact Phone:">
                  <MaskedInput mask="(11)-111-111-1111" />
                </Form.Item>
              </div>
              <div>
                <Typography>Address</Typography>
                <Form.Item name="street" label="Street:">
                  <Input type="text" />
                </Form.Item>
                <div>
                  <Form.Item name="extNum" label="Exterior No.:">
                    <Input type="text" />
                  </Form.Item>
                  <Form.Item name="intNum" label="Interior No.:">
                    <Input type="text" />
                  </Form.Item>
                </div>
                <Form.Item name="city" label="City:">
                  <Input type="text" />
                </Form.Item>
                <Form.Item name="country" label="Country:">
                  <Select onChange={(value, key) => handleCountry(key)}>
                    {CountryRegionData.map((country, index) => (
                      <Option value={country[0]} key={index}>{country[0]}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="region" label="Region/State:">
                  <Select>
                    { regions ? ( 
                        regions.map((region, index) => (
                      <Option value={region} key={index}>{region}</Option>
                    ))
                    )
                    : null
                    }
                  </Select>
                </Form.Item>
              </div>
              <div className="section1-right"></div>
            </div>
          </Col>
        </>
      ) : null}
    </>

  )
                }

export default BecomeSchool;
