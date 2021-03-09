import { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Typography,
  Row,
  Col,
  List,
  Divider,
} from "antd";
import { formattedDate } from "../utils/dateFormatter";
import FollowUpMessage from "../components/messages/FollowUp";
// import CancelApplication from "../application/CancelApplication";
import { getApplicationByUser } from "../services/application";
import { useAuthInfo } from "../hooks/authContext";

function UserApplications() {
  const { user } = useAuthInfo();
  const [applications, setApplications] = useState(null);
  const [focusApplication, setFocusApplication] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [columns, setColumns] = useState(false);

  useEffect(() => {
    async function getApplications() {
      const { data } = await getApplicationByUser(user);
      setApplications(data);

      const cols = [
        {
          title: "Student",
          dataIndex: "_student",
          key: "_student",
          render: (_student) => `${_student.alias}`,
        },
        {
          title: "School",
          dataIndex: "_school",
          key: "_school",
          render: ({ name }) => `${name}`,
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
                  : text === "Aproved"
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
          //TODO: agregar componente modal para enviar mensaje
        },
        {
          title: "Approval",
          key: "approval",
          render: (record) =>
            !record.isCancelled ? (
              <Button onClick={() => handleCancellation(record)}>
                Cancel Application
              </Button>
            ) : (
              <Button disabled>Send Cancelation</Button>
            ),

          //TODO: agregar componente modal para confirmar cancelación
        },
      ];

      await setColumns(cols);
    }
    getApplications();
  }, []);

  console.log(applications);

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
            {/* <FollowUpMessage
              focusApplication={focusApplication}
              setIsModalVisible={setIsModalVisible}
            ></FollowUpMessage> */}
          </Modal>

          <Modal visible={isModal2Visible} onCancel={onCancel2} footer={null}>
            {/* <CancelApplication
              focusApplication={focusApplication}
              setIsModal2Visible={setIsModal2Visible}
            ></CancelApplication> */}
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default UserApplications;
