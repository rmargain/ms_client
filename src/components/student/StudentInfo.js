import { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Modal, Typography } from "antd";
import { studentProfile } from "../../services/student";
import { formattedDate } from "../../utils/dateFormatter";
import FollowUpMessage from "../messages/FollowUp";
import CancelApplication from '../application/CancelApplication'


function StudentInfo({ focusStudent, setIsModal3Visible }) {
  const { _id } = focusStudent;
  const [applications, setApplications] = useState(null);
  const [focusApplication, setFocusApplication] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);

 

  useEffect(() => {
    async function currentStudentApplications() {
      const { data } = await studentProfile(_id);
      setApplications(data._applications);
    }
    currentStudentApplications();
  }, [_id, isModal2Visible]);

  const handleFollowUp = (record) => {
    setFocusApplication(record);
    setIsModalVisible(true)
  };

  const onCancel = () =>{
    setFocusApplication(null);
    setIsModalVisible(false);
  }

  
  const onCancel2 = () => {
    setIsModal2Visible(false)

  }
  
  const handleCancellation = (record) => {
    setFocusApplication(record)
    setIsModal2Visible(true)
  }



  const columns = [
    {
      title: "School",
      dataIndex: "_school",
      key: "school",
      render: (_school) => `${_school.name}`,
    },
    {
      title: "Status",
      dataIndex: "admitted",
      key: "status",
      render: (text) => (
        <Tag
          color={
            text === "Under Review"
              ? "geekblue"
              : text === "Approved"
              ? "green"
              : text === "Cancelled"
              ? "grey"
              : "volcano"
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Application Date",
      dataIndex: "created_at",
      key: "application-date",
      render: (text) => `${formattedDate(text)}`,
    },
    {
      title: "Follow Up",
      key: "follow-up",
      render: (record) => (
        !record.isCancelled ? (
        <Button onClick={() => handleFollowUp(record)}>Follow Up</Button>
        )
        : <Button disabled>Follow Up</Button>
      ),
    },
    {
      title: "Cancel Application",
      key: "cancel-application",
      render: (record) =>
        !record.isCancelled ? (
          <Button onClick={() => handleCancellation(record)}>Cancel Application</Button>
        ) : (
          <Button disabled>Send Cancelation</Button>
        ),
    },
  ];

  return (
    <>
    {applications ? (
      <Table
        columns={columns}
        pagination={{ pageSize: 6 }}
        rowKey={(record) => record._id}
        dataSource={applications}
      />
    ): null}
      {focusApplication ? (
        <>
        <Modal visible={isModalVisible} onCancel={onCancel} footer={null}> 
        <FollowUpMessage focusApplication={focusApplication} setIsModalVisible={setIsModalVisible}></FollowUpMessage>
        </Modal>

        <Modal visible={isModal2Visible} onCancel={onCancel2} footer={null}> 
          <CancelApplication focusApplication={focusApplication} setIsModal2Visible={setIsModal2Visible}></CancelApplication>
        </Modal>
        </>
      ) : null }
      
    </>
  );
}

export default StudentInfo;
