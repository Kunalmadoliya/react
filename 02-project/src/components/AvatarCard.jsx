export default function AvatarCard({data , level = "new"})   {
  return (
    <section>
      <h1>Card</h1>
      <h3>{data.id}</h3>
      <h3>{data.age}</h3>
      <h3>{data.city}</h3>
      <h3>{data.isActive}</h3>
    </section>
  );
}
