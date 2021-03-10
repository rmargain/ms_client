import { useEffect, useState } from "react";
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
import { studentsByUser } from "../../services/student";
import {createMessage} from "../../services/messages"


function FollowUpMessage({ focusApplication, setIsModalVisible }) {
const [seeinfo, setseeinfo] = useState(null)

  const [form] = Form.useForm();

  async function handleSubmit(info) {
    try {
      await createMessage(info, focusApplication._id);
      setseeinfo(info)
      await message.success(
        "Message Sent!"
      );
      setIsModalVisible(false)
    } catch (error) {
      message.error(error.response.data.message);
    }
  }

  console.log(seeinfo)

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={{ span: 24, offset: 0 }}>
        <Typography.Title level={4}>
          Application Follow-up Message
        </Typography.Title>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="message"
            label="Write your message:"
          >
            <Input.TextArea rows={8} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Send!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default FollowUpMessage;
