import { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Typography, List } from "antd";
import { formattedDate } from "../utils/dateFormatter";
import FollowUpMessage from "../components/messages/FollowUp";
import ApproveApplication from "../components/application/ApproveApplication";
import { getApplicationsbySchoolUser } from "../services/application";
import { useAuthInfo } from "../hooks/authContext";

function SchoolApplications() {
  const { user } = useAuthInfo();
  const [applications, setApplications] = useState(null);
  const [focusApplication, setFocusApplication] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [columns, setColumns] = useState(false);

  useEffect(() => {
    async function getApplications() {
      const { data: {applications} } = await getApplicationsbySchoolUser(user);
      setApplications(applications);

      const cols = [
        {
          title: "School",
          dataIndex: "_school",
          key: "_school",
          render: ({ name }) => `${name}`,
        },
        {
          title: "User",
          dataIndex: "_user",
          key: "_suser",
          render: (_user) => `${_user.name} ${_user.lastname}`,
        },
        {
          title: "Student",
          dataIndex: "_student",
          key: "_student",
          render: (_student) => `${_student.alias}`,
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
          title: "Message Applicant",
          key: "message",
          render: (record) =>
            !record.isCancelled ? (
              <Button onClick={() => handleFollowUp(record)}>Follow Up</Button>
            ) : (
              <Button disabled>Message</Button>
            ),
        },
        {
          title: "Approval",
          key: "approval",
          render: (record) =>
            !record.isCancelled ? (
              <Button onClick={() => handleCancellation(record)}>
                Approve Application
              </Button>
            ) : (
              <Button disabled>Approve Application</Button>
            ),
        },
      ];

      await setColumns(cols);
    }
    getApplications();
  }, [isModal2Visible]);

  console.log(applications)

  const handleFollowUp = (record) => {
    setFocusApplication(record);
    setIsModalVisible(true);
  };

  const onCancel = () => {
    setFocusApplication(null);
    setIsModalVisible(false);
  };

  const onCancel2 = () => {
    setIsModal2Visible(false);
  };

  const handleCancellation = (record) => {
    setFocusApplication(record);
    setIsModal2Visible(true);
  };

  return (
    <>
      {applications ? (
        <Table
          columns={columns}
          pagination={{ pageSize: 6 }}
          rowKey={(record) => record._id}
          dataSource={applications}
          expandable={{
            expandedRowRender: (record) => (
              <List
                itemLayout="horizontal"
                dataSource={record._messages}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography level={4}>
                            From: {item.from.name} {item.from.lastname}
                          </Typography>
                          <Typography level={4}>
                            Date: {formattedDate(item.created_at)}
                          </Typography>
                        </div>
                      }
                      description={item.text}
                    />
                  </List.Item>
                )}
              />
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
        />
      ) : null}
      {focusApplication ? (
        <>
          <Modal visible={isModalVisible} onCancel={onCancel} footer={null}>
            <FollowUpMessage
              focusApplication={focusApplication}
              setIsModalVisible={setIsModalVisible}
            ></FollowUpMessage>
          </Modal>

          <Modal visible={isModal2Visible} onCancel={onCancel2} footer={null}>
            <ApproveApplication
              focusApplication={focusApplication}
              setIsModal2Visible={setIsModal2Visible}
            ></ApproveApplication>
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default SchoolApplications;
