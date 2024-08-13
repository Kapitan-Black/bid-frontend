import { useGetMainBidForms } from "@/api/MainFormApi";
import { Separator } from "@/components/ui/separator";
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
              <Separator/>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReadyBidPage;
