import { Form, Typography, Col, Row, Button, Input, message, Select } from "antd";
import { approveApplication } from "../../services/application";

const {Option} = Select

function ApproveApplication({ focusApplication, setIsModal2Visible }) {
  const [form] = Form.useForm();

  async function handleSubmit(info) {
    try {
      await approveApplication(focusApplication._id, info);
      await message.success("Message Sent!");
      setIsModal2Visible(false);
    } catch (error) {
      message.error(error.response.data.message);
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={{ span: 24, offset: 0 }}>
        <Typography.Title level={4}>
          Delete Message?
        </Typography.Title>
        <Typography>
          Please select the student application veredice and include a message
          if desired.
        </Typography>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="decision" label="School Decision">
            <Select style={{ width: "100%" }} required>
              <Option value="Approved">Approved</Option>
              <Option value="Not Approved">Not Approved</Option>
            </Select>
          </Form.Item>
          <Form.Item name="message" label="Write your message:">
            <Input.TextArea rows={8} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Send Veredict!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default ApproveApplication;
