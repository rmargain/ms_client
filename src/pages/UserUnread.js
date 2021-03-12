import UserMessages from "../components/messages/UserMessages";
function UserUnread() {
  const filter = "unread";
  return (
    <div>
      <UserMessages filter={filter} />
    </div>
  );
}

export default UserUnread;
