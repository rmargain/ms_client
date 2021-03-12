import { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Typography, List, message } from "antd";
import { formattedDate } from "../../utils/dateFormatter";
import Reply from "./Reply";
import {deleteMessage, recoverMessage, markAsRead, getMessagesBySchoolUser} from "../../services/messages";


function SchoolMessages( {filter} ) {
  const [messages, setMessages] = useState(null);
  const [focusApplication, setFocusApplication] = useState(null);
  const [focusMessage, setFocusMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [columns, setColumns] = useState(false);

  useEffect(() => {
    async function getMessages() {
      const { data } = await getMessagesBySchoolUser();
       const finalData =
        filter === "inbox"
          ? data.filter(
              (message) =>
                message.onFromModel === "User" && message.toDeleted === false
            )
          : filter === "unread"
          ? data.filter(
              (message) =>
                message.onFromModel === "User" &&
                message.status === "Unread" &&
                message.toDeleted === false
            )
          : filter === "sent"
          ? data.filter((message) => message.onFromModel === "School")
          : data.filter(
              (message) =>
                message.onFromModel === "User" && message.toDeleted === true
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
          title: "Reply",
          key: "reply",
          render: (record) => (
            <Button onClick={() => handleReply(record)}>Reply</Button>
          ),
        },
        {
          title: "Delete/Recover",
          key: "delete/recover",
          render: (record) => (
            <Button onClick={() => handleDeleteModal(record)}>{(!record.toDeleted && record.onToModel === "School") ||
      (!record.fromDeleted && record.onFromModel === "School") ? "Delete" : "Recover"}</Button>
          ),
        },
      ];

      await setColumns(cols);
    }
    getMessages();
  }, [isModal2Visible, isModalVisible, focusMessage]);

  const handleReply =  (record) => {
    setFocusApplication(record._application);
    setIsModalVisible(true);
    
  };

  console.log(messages)

  const onCancel = () => {
    setFocusApplication(null);
    setIsModalVisible(false);
  };

  const onCancel2 = () => {
    setIsModal2Visible(false);
  };

const handleDeleteModal =  (record) => {
  setFocusMessage(record);
  setIsModal2Visible(true);
}

  const handleDelete = async () => {
    if (
      (!focusMessage.toDeleted && focusMessage.onToModel === "School") ||
      (!focusMessage.fromDeleted && focusMessage.onFromModel === "School")
    ) {
      await deleteMessage(focusMessage._id);
    } else {
      await recoverMessage(focusMessage._id);
    }
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

      <>
        <Modal visible={isModalVisible} onCancel={onCancel} footer={null}>
          <Reply
            focusApplication={focusApplication}
            setIsModalVisible={setIsModalVisible}
          ></Reply>
        </Modal>

        <Modal
          visible={isModal2Visible}
          onCancel={onCancel2}
          onOk={(e, record) => handleDelete(record)}
        >
            <Typography level={4}>Confirm</Typography>
          
        </Modal>
      </>
    </>
  );
}

export default SchoolMessages;
