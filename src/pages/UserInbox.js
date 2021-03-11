import UserMessages from "../components/messages/UserMessages";
function UserInbox() {
  const filter = "inbox";
  return (
    <div>
      <UserMessages filter={filter} />
    </div>
  );
}

export default UserInbox;
