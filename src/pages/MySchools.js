import { Form, Typography, Col, Row, Button, Card, Modal, Skeleton, List } from "antd";
import {InfoCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { useState, useEffect } from "react";
import { getSchoolsByUser, deleteSchool } from "../services/school";
import SchoolCard from '../components/school/SchoolCard'
import { Link } from "react-router-dom";


function MySchools() {
  const [form] = Form.useForm();
  const [schools, setSchools] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  
  useEffect(() => {
    async function getSchools() {
      const { data } = await getSchoolsByUser();
      setSchools(data.schools);
    }
    getSchools();
  }, [isModal2Visible]);

  const showModal = (school) => {
    setSelectedSchool(school)
    setIsModalVisible(true)
  }


  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const showModal2 = (school) => {
    setSelectedSchool(school)
    setIsModal2Visible(true);
  };

   const handleOk2 = async () => {
    await deleteSchool(selectedSchool._id)
      setIsModal2Visible(false);
   };
   const handleCancel2 = () => {
     setIsModal2Visible(false);
   };
  

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: "12px" }}>
        <Col>
          <Button shape="round">
            <Link to="/add-school">Add new School</Link>
          </Button>
          <Modal
            title="School Info"
            footer={false}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <SchoolCard school={selectedSchool} />
            <Button shape="round" onClick={() => setIsModalVisible(false)}>
            {selectedSchool ? 
              <Link to={`/edit-school/${selectedSchool._id}`}>Edit</Link>
            : null}
            </Button>
          </Modal>

          <Modal
            title="Confirm School Deletion"
            visible={isModal2Visible}
            onOk={handleOk2}
            onCancel={handleCancel2}
          >
            <Typography level={3}>
              All school data will be lost, do you wish to continue?
            </Typography>
          </Modal>
        </Col>
      </Row>

      <div className="My School List">
        {!schools ? (
          <Skeleton />
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
            dataSource={schools}
            renderItem={(school) => (
              <>
                <List.Item>
                  <Card
                    hoverable
                    conver={school.images ? school.images[0] : null}
                    onMouseEnter={() => setSelectedSchool(school)}
                    actions={[
                      <InfoCircleOutlined
                        key="info"
                        onClick={() => showModal(school)}
                      />,
                          <Link to={`/edit-school/${school._id}`} props={selectedSchool}> 
                      <EditOutlined
                        key="edit">
                        </EditOutlined>
                          </Link>,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => showModal2(school)}
                      />,
                    ]}
                  >
                    <Card.Meta
                      title={`${school.name}`}
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

export default MySchools;
