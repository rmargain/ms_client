import { Form, Typography, Col, Row, Button, Input, Card } from "antd";
import {useState, useEffect} from "react";
import { useAuthInfo } from "../hooks/authContext";
import {studentsByUser} from "../services/student"
import Student from '../components/StudentForm'

function Kids() {
  const [form] = Form.useForm();
  const { user } = useAuthInfo();
  const [students, setStudents] = useState(null)
  useEffect(() => {
      async function getStudents(){
        const { data } = await studentsByUser();
        setStudents(data)
      }
      getStudents()
  }, [students])


  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={{ span: 24, offset: 4 }}>
        <Typography.Title level={1}>Eres un chingon</Typography.Title>
        {students ? (
          students.map(student => (
            <Col xs={{ span: 24 }} md={{ span: 8 }} key={student._id}>
            <Card
              title={student.alias}
              cover={<img alt='example' src={student.avatar} />}
              extra={student.level}
            >
            </Card>
          </Col>
          ))
        ):
        null}
      </Col>
    </Row>
  );
}

export default Kids;
