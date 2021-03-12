import SchoolMessages from "../components/messages/SchoolMessages";
function SchoolInbox() {
  const filter = "inbox";
  return (
    <div>
      <SchoolMessages filter={filter} />
    </div>
  );
}

export default SchoolInbox;
