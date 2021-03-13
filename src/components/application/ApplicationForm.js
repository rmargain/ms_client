import {useEffect, useState} from 'react'
import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  Input,
  message,
  Select,
} from "antd";
import { createApplication } from "../../services/application";
import {studentsByUser} from "../../services/student"

const { Option } = Select;

function StudentApplication({ setIsModal2Visible, selectedSchool }) {
const [students, setStudents] = useState(null)

    useEffect(() => {
       const getStudents = async () => {
           const {data} = await studentsByUser()
           setStudents(data)
       }
       getStudents()

    }, [selectedSchool])

  const [form] = Form.useForm();

  async function handleSubmit(applicationInfo) {
    try {
      await createApplication(selectedSchool._id, applicationInfo);
      setIsModal2Visible(false);
      message.success("Application created! School admissions' office will now review your request.");
    } catch (error) {
      message.error(error.response.data.message);
    }
  }


  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={{ span: 24, offset: 0 }}>
        <Typography.Title level={1}>
          School Program Application Form
        </Typography.Title>
        <Typography>Application for: {selectedSchool.name}</Typography>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="alias" label="Alias:">
            <Select style={{ width: "100%" }}>
              { students ? students.map((student, index) => (
                    <Option key={index} value={student.alias}>{student.alias}</Option>
              ))
                : null
                }
            </Select>
          </Form.Item>
          <Form.Item name="message" label="Include a message for the School's admissions office:">
            <Input.TextArea rows={8} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Apply!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default StudentApplication;
