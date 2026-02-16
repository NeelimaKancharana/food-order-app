export default function Error({title,mesage})
{
    return(
      <div className="error">
         <h2>{title}</h2>
         <p>{mesage}</p>
      </div>
    );
}