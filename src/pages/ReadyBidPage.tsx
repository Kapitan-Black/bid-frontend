import { useGetMainBidForms } from "@/api/MainFormApi";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const ReadyBidPage = () => {
  const { data } = useGetMainBidForms();

    if (!data) {
      return (
        <div className="container mx-auto">
          <p>Loading...</p>
        </div>
      );
    }

  return (
    <>
      {data && (
        <ul>
          {data.map((form) => (
            <li key={form._id}>
              <Link
                className="hover:text-blue-400"
                to={`/form/${form.formName}`}
              >
                {" "}
                {form.formName}
              </Link>
              <Separator className="bg-gray-300" />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReadyBidPage;
