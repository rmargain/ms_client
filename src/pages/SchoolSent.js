import SchoolMessages from "../components/messages/SchoolMessages";
function SchoolInbox() {
  const filter = "sent";
  return (
    <div>
      <SchoolMessages filter={filter} />
    </div>
  );
}

export default SchoolInbox;
