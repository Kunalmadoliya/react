import "./App.css";
import AvatarCard from "./components/AvatarCard.jsx";

const data = [
  {id: 101, name: "Ritika", age: 23, city: "Noida", isActive: true},
  {id: 102, name: "Karan", age: 26, city: "Indore", isActive: false},
  {id: 103, name: "Sahil", age: 22, city: "Surat", isActive: true},
  {id: 104, name: "Nisha", age: 24, city: "Bhopal", isActive: false},
];

interface User {
  name?: string;
  children?: React.ReactNode;
}

function Shell({name, children}: User) {
  return (
    <section>
      <p>Reusable Shell</p>
      <h3>{name}</h3>
      <h3>{children}</h3>
    </section>
  );
}

function App() {
  return (
    <>
      <h1>hello from kunal</h1>

      <section>
        <Shell name="kunal">
   
            <p>hgelloooo</p>
            <h1>how are you </h1>
    
        </Shell>
      </section>

      <section>
        {data.map((d) => (
          <AvatarCard key={d.id} level={d.id === 1 ? "new" : "old"} data={d} />
        ))}
      </section>
    </>
  );
}

export default App;
