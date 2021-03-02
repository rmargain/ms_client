import { Form, Typography, Col, Row, Button, Input, Card, List, Avatar, Spin, message, Skeleton, Modal} from "antd";
import {useState, useEffect} from "react";
import { useAuthInfo } from "../hooks/authContext";
import {studentsByUser} from "../services/student"
import Student from "../components/StudentForm";
import {
  EditOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";


function Kids() {
  const [form] = Form.useForm();
  const { user } = useAuthInfo();
  const [students, setStudents] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [isModal3Visible, setIsModal3Visible] = useState(false);
  useEffect(() => {
      async function getStudents(){
        const { data } = await studentsByUser();
        setStudents(data)
      }
      getStudents()
      console.log(students)
  }, [])

const showModal = () => {
  setIsModalVisible(true)
}
 const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: "12px" }}>
        <Col>
          <Button shape="round" onClick={showModal}>
            Add Student
          </Button>
          <Modal
            title="Create Student"
            footer={false}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Student setIsModalVisible={setIsModalVisible} />
          </Modal>
        </Col>
      </Row>

      <div className="My Students List">
        {!students ? (
          <Skeleton />
        ) : students.length === 0 ? (
          <Typography level={4}>
            You still haven't registered any students in this account.
          </Typography>
        ) : (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={students}
            renderItem={(student) => (
              <List.Item>
                <Card
                  hoverable
                  onClick={() => console.log("works")}
                  actions={[
                    <InfoCircleOutlined key='info' onClick />,
                    <EditOutlined key="edit" />,
                  ]}
                >
                  <Card.Meta
                    avatar={<Avatar src={student.avatar} />}
                    title={`Alias: ${student.alias} Level: ${student.level}`}
                    description="Click for more info"
                  />
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}

export default Kids;
