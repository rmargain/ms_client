
import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  Input,
  message,
} from "antd";
import { cancelApplication } from "../../services/application";

function CancelApplication({ focusApplication, setIsModal2Visible }) {
  const [form] = Form.useForm();

  async function handleSubmit(info) {
    try {
      await cancelApplication(focusApplication._id, info.message);
      await message.success("Cancellation Message Sent!");
      setIsModal2Visible(false);
    } catch (error) {
      message.error(error.response.data.message);
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={{ span: 24, offset: 0 }}>
        <Typography.Title level={4}>
          Application Cancellation Message
        </Typography.Title>
        <Typography>
          Are you sure you want to cancel this application? Any progress will be
          lost and in case you consider this option in the future you would need
          to start a new application.
        </Typography>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="message" label="Write your message:">
            <Input.TextArea rows={8} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Send Cancellation!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default CancelApplication;
