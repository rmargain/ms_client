import { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Typography, List, message } from "antd";
import { formattedDate } from "../../utils/dateFormatter";
import Reply from "./Reply";
import {deleteMessage, recoverMessage, markAsRead, getMessagesByUser} from "../../services/messages";
import { useAuthInfo } from "../../hooks/authContext";

function UserMessages( {filter} ) {
  const { user } = useAuthInfo();
  const [messages, setMessages] = useState(null);
  const [focusApplication, setFocusApplication] = useState(null);
  const [focusMessage, setFocusMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [columns, setColumns] = useState(false);

  useEffect(() => {
    async function getMessages() {
      const { data } = await getMessagesByUser();

       const finalData =
        filter === "inbox"
          ? data.filter(
              (message) =>
                message.onFromModel === "School" && message.toDeleted === false
            )
          : filter === "unread"
          ? message.filter(
              (message) =>
                message.onFromModel === "School" &&
                message.status === "Unread" &&
                message.toDeleted === false
            )
          : filter === "sent"
          ? message.filter((message) => message.onFromModel === "User")
          : message.filter(
              (message) =>
                message.onFromModel === "School" && message.toDeleted === true
            );
      setMessages(finalData);

      const cols = [
        {
          title: "From",
          dataIndex: "from",
          key: "from",
          render: ( from) => `${from.name} ${from.lastname}`,
        },
        {
          title: "Date",
          dataIndex: "created_at",
          key: "created_at",
          render: (text) => `${formattedDate(text)}`,
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (text) => (
            <Tag color={text === "Unread" ? "volcano" : text === "read"}>
              {text}
            </Tag>
          ),
        },
        {
          title: "Message Date",
          dataIndex: "created_at",
          key: "message-date",
          render: (text) => `${formattedDate(text)}`,
        },
        {
          title: "Reply",
          key: "reply",
          render: (record) => (
            <Button onClick={() => handleReply(record)}>Reply</Button>
          ),
        },
        {
          title: "Delete",
          key: "delete",
          render: (record) => (
            <Button onClick={() => handleDeleteModal(record)}>Delete</Button>
          ),
        },
      ];

      await setColumns(cols);
    }
    getMessages();
  }, [isModal2Visible, focusMessage]);

  const handleReply = (record) => {
    setFocusApplication(record._application);
    setIsModalVisible(true);
  };

  console.log(isModal2Visible)

  const onCancel = () => {
    setFocusApplication(null);
    setIsModalVisible(false);
  };

  const onCancel2 = () => {
    setIsModal2Visible(false);
  };

const handleDeleteModal = (record) => {
  setFocusMessage(record);
  setIsModal2Visible(true);
}

  const handleDelete = async (record) => {
    await setFocusMessage(record);
    await deleteMessage(record._id)
    setIsModal2Visible(false);
  };
 
  const handleExpand = async (record) => {
    await markAsRead(record._id)
    await setFocusMessage(record)
  }
  


  return (
    <>
      {messages ? (
        <Table
          columns={columns}
          pagination={{ pageSize: 6 }}
          rowKey={(record) => record._id}
          dataSource={messages}
          onExpand={(expanded, record) => handleExpand(record)}
          expandable={{
            expandedRowRender: (record) => (
              <Typography level={6}>{record.text}</Typography>
            ),
          }}
        />
      ) : null}
      {focusMessage ? (
        <>
          <Modal visible={isModalVisible} onCancel={onCancel} footer={null}>
            <Reply
              focusApplication={focusApplication}
              setIsModalVisible={setIsModalVisible}
            ></Reply>
          </Modal>

          <Modal visible={isModal2Visible} onCancel={onCancel2} onOk={handleDelete} >
            <Typography level={4}>
              Confirm Message Delete
            </Typography>
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default UserMessages;
