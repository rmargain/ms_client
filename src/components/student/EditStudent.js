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
import { updateStudent } from "../../services/student";

const { Option } = Select;

function StudentEdit({ focusStudent, setIsModal2Visible }) {
    const {alias, level, ...rest} = focusStudent
    const initialValues = {alias, level}
  const [form] = Form.useForm();
form.setFieldsValue(initialValues)

  async function handleSubmit({alias, level}) {
    const studentInfo = {alias, level, ...rest}
    try {
      await updateStudent(studentInfo);
      setIsModal2Visible(false);
      message.success("Student updated");
    } catch (error) {
      message.error(error.response.data.message);
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={{ span: 24, offset: 0 }}>
        <Typography.Title level={1}>Student Edit Form</Typography.Title>
        <Form form={form} onFinish={handleSubmit} layout="vertical" setFieldsValue={initialValues}>
          <Form.Item name="alias"  label="Alias:">
            <Input type="text" />
          </Form.Item>
          <Form.Item name="level" label="Level:">
            <Select style={{ width: "100%" }}>
              <Option value= {0}>Kinder 3 / Pre-First</Option>
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
          <Button type="primary" htmlType="submit" block size="large">
            Edit Student
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default StudentEdit;
