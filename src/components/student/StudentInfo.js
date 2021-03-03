import { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import {studentProfile} from "../../services/student";
import {formattedDate} from "../../utils/dateFormatter"

function StudentInfo({ focusStudent }) {
  const { _id } = focusStudent;
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    async function currentStudentApplications() {
      const { data } = await studentProfile(_id);
      setApplications(data._applications);
    }
    currentStudentApplications();
    
  }, [_id]);

  console.log(_id);
  console.log(applications)

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
              : text === "Aproved"
              ? "green"
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
      render: (_id) => <Button>Send Message</Button>,
      //TODO: agregar componente modal para enviar mensaje
    },
    {
      title: "Cancel Application",
      dataIndex: "created_at",
      key: "application-date",
      render: (_id) => <Button>Send Cancelation</Button>,
      //TODO: agregar componente modal para confirmar cancelación
    },
  ];

  return (
    <Table
      columns={columns}
      pagination={{ pageSize: 6 }}
      rowKey={(record) => record._id}
      dataSource={applications}
    />
  );
}

export default StudentInfo;
