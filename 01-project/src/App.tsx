import "./App.css";

const data = [
  {id: 1, name: "Aarav", age: 22, city: "Delhi", isActive: true},
  {id: 2, name: "Ishita", age: 25, city: "Mumbai", isActive: false},
  {id: 3, name: "Rohan", age: 21, city: "Bangalore", isActive: true},
  {id: 4, name: "Meera", age: 24, city: "Pune", isActive: false},
  {id: 5, name: "Kabir", age: 23, city: "Chandigarh", isActive: true},
  {id: 6, name: "Ananya", age: 26, city: "Hyderabad", isActive: true},
  {id: 7, name: "Dev", age: 20, city: "Jaipur", isActive: false},
  {id: 8, name: "Sneha", age: 27, city: "Kolkata", isActive: true},
];

function App() {
  return (
    <>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>{user.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>  
    </>
  );
}

export default App;
