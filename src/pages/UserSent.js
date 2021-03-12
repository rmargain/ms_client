import UserMessages from "../components/messages/UserMessages";
function UserSent() {
  const filter = "sent";
  return (
    <div>
      <UserMessages filter={filter} />
    </div>
  );
}

export default UserSent;
