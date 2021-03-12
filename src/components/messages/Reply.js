import { useState } from "react";
import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  Input,
  message,
} from "antd";

import {createMessage} from "../../services/messages"


function Reply({ focusApplication, setIsModalVisible }) {


  const [form] = Form.useForm();

  async function handleSubmit(info) {
    try {
      await createMessage(info, focusApplication._id);
      await message.success(
        "Message Sent!"
      );
      setIsModalVisible(false)
    } catch (error) {
      message.error(error.response.data.message);
    }
  }


  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={{ span: 24, offset: 0 }}>
        <Typography.Title level={4}>
          Reply Message
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

export default Reply;
