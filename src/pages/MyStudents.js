import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  Card,
  List,
  Avatar,
  Skeleton,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import { useAuthInfo } from "../hooks/authContext";
import { studentsByUser, deleteStudent } from "../services/student";
import Student from "../components/student/StudentForm";
import StudentEdit from "../components/student/EditStudent";
import StudentInfo from "../components/student/StudentInfo"
import { EditOutlined, InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";

function Kids() {
  const [form] = Form.useForm();
  const { user } = useAuthInfo();
  const [students, setStudents] = useState(null);
  const [focusStudent, setFocusStudent] = useState(null);
  const [infoStudent, setInfoStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [isModal3Visible, setIsModal3Visible] = useState(false);
  const [isModal4Visible, setIsModal4Visible] = useState(false);

  useEffect(() => {
    async function getStudents() {
      const { data } = await studentsByUser();
      setStudents(data);
    }
    getStudents();
  }, [isModalVisible, isModal2Visible, isModal4Visible]);


  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal2 = (student) => {
    setFocusStudent(student)
    setIsModal2Visible(true);
  };
  const handleOk2 = () => {
    setIsModal2Visible(false);
    setFocusStudent(null)
  };

  const handleCancel2 = () => {
    setIsModal2Visible(false);
    setFocusStudent(null)
  };
  const showModal3 = (student) => {
    setFocusStudent(student);
    setIsModal3Visible(true);
  };
  const handleOk3 = () => {
    setIsModal3Visible(false);
  };

  const handleCancel3 = () => {
    setIsModal3Visible(false);
  };
  const showModal4 =  (student) => {
    setFocusStudent(student);
    setIsModal4Visible(true);
  };
  const handleOk4 = async (student) => {
    await deleteStudent(focusStudent._id)
    setIsModal4Visible(false);
  };

  const handleCancel4 = () => {
    setIsModal4Visible(false);
  };

  const getLevel = (level) => {
    const print = "";
    switch (level) {
      case 0:
        return "Kinder 3 / Pre-first";
      case 1:
        return "Elementary - 1st";
        
      case 2:
        return "Elementary - 2nd";
        
      case 3:
        return "Elementary - 3rd";
        
      case 4:
        return "Elementary - 4th";
        
      case 5:
        return "Elementary - 5th";
        
      case 6:
        return "Elementary - 6th";
        
      case 7:
        return "Middle School - 7th";
        
      case 8:
        return "Middle School - 8th";
        
      case 9:
       return "Middle School - 9th";
        
      case 10:
        return "High School - 10th";
       
      case 11:
        return "High School - 11th";
        
      case 12:
        return "High School - 12th";
        
    }
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

          <Modal
            title="Edit Student"
            footer={false}
            visible={isModal2Visible}
            onOk={handleOk2}
            onCancel={handleCancel2}
          >
            <StudentEdit
              focusStudent={focusStudent}
              setIsModal2Visible={setIsModal2Visible}
              setStudents={setStudents}
            />
          </Modal>

          <Modal
            title="School Applications"
            footer={false}
            visible={isModal3Visible}
            onOk={handleOk3}
            onCancel={handleCancel3}
            className="student-info"
            width='90%'
          >
            <StudentInfo
              focusStudent={focusStudent}
              setIsModal3Visible={setIsModal3Visible}
              
            />
          </Modal>
          <Modal
            title="Confirm Student Deletion"
            visible={isModal4Visible}
            onOk={handleOk4}
            onCancel={handleCancel4}
          >
            <Typography level={3}>All student data will be lost, do you wish to continue?</Typography>
              
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
              <>
                <List.Item>
                  <Card
                    hoverable
                    onMouseEnter={() => setFocusStudent(student)}
                    // onMouseLeave={() => setFocusStudent(null)}
                    actions={[
                      <InfoCircleOutlined
                        key="info"
                        onClick={() => showModal3(student)}
                      />,
                      <EditOutlined
                        key="edit"
                        onClick={() => showModal2(student)}
                      />,
                      <DeleteOutlined
                      key="delete"
                      onClick={()=> showModal4(student)}
                      />
                    ]}
                  >
                    <Card.Meta
                      avatar={<Avatar src={student.avatar} />}
                      title={`${student.alias}`}
                      description={getLevel(student.level)}
                    />
                  </Card>
                </List.Item>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}

export default Kids;
