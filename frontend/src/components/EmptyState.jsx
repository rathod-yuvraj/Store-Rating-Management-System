
export default function EmptyState({
  message
}) {

  return (

    <div
      className="card"
      style={{
        textAlign: "center"
      }}
    >

      <h2>
        {message}
      </h2>

    </div>

  );
}
