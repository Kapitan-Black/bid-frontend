import { useGetMainBidForms } from "@/api/MainFormApi";
import { Link } from "react-router-dom";

const ReadyBidPage = () => {
  const { data } = useGetMainBidForms();

  return (
    <>
     
      {data && (
        <ul>
          {data.map((form) => (
            <li key={form._id}>
              <Link to={`/form/${form.formName}`}> {form.formName}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReadyBidPage;
