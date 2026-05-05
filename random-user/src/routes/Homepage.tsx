import {createFileRoute} from "@tanstack/react-router";
import {useState} from "react";

export const Route = createFileRoute("/Homepage")({
  component: RouteComponent,
});

function RouteComponent() {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers",
      );
      const data = await response.json();

      console.log(data.data);
      
      setUsers(data.data || []);


    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  console.log(users);


 fetchUsers();
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold underline mb-4">Random Users</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        
      </div>
    </div>
  );
}

export default RouteComponent;
