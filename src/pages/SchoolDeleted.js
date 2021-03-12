import SchoolMessages from "../components/messages/SchoolMessages";
function SchoolInbox() {
  const filter = "deleted";
  return (
    <div>
      <SchoolMessages filter={filter} />
    </div>
  );
}

export default SchoolInbox;
