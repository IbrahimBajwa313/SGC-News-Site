import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Hardcoded user data (since MongoDB is not connected yet)
const users = [
  { id: '1', firstName: 'John', lastName: 'Doe', username: 'john_doe' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', username: 'jane_smith' },
];

export default function DeleteUser() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedUser = users.find((user) => user.id === id);
      setUser(selectedUser);
    }
  }, [id]);

  const handleDelete = () => {
    // For now, we're just simulating the delete action
    alert(`User with ID ${id} deleted!`);
    router.push('/admin/users'); // Redirect to the users page after deletion
  };

  const handleCancel = () => {
    router.push('/admin/users'); // Redirect to users page if cancellation happens
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Delete Confirmation</h2>
        <div className="mb-4">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
        <form>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Confirm Delete
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
