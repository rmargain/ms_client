import SchoolMessages from "../components/messages/SchoolMessages";
function SchoolInbox() {
  const filter = "unread";
  return (
    <div>
      <SchoolMessages filter={filter} />
    </div>
  );
}

export default SchoolInbox;
