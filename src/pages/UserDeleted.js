import UserMessages from "../components/messages/UserMessages";
function UserDeleted() {
  const filter = "deleted";
  return (
    <div>
      <UserMessages filter={filter} />
    </div>
  );
}

export default UserDeleted;
