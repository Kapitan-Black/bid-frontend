import { useEffect, useState } from "react";
import { useDeleteForm, useGetMainBidForms } from "@/api/MainFormApi";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { dateFormat } from "@/config/utils";
import RemoveButton from "@/components/RemoveButton";
import ConfirmationModal from "@/components/ConfirmationModal";

const ReadyBidPage = () => {
  const { data: initialData, refetch } = useGetMainBidForms();
  const [data, setData] = useState(initialData || []);

  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const { deleteForm } = useDeleteForm();

  const handleDeleteForm = (id: string) => {
    setSelectedForm(id);
    setShowModal(true);
  };

  const confirmDeleteForm =  () => {
    if (selectedForm) {
     deleteForm(selectedForm)
     setData((prevData) => prevData.filter((form) => form._id !== selectedForm));
      refetch();
      setSelectedForm(null)
    }
    setShowModal(false)
  };

  useEffect(() => {
    setData(initialData || []);
  }, [initialData]);

  if (!data || !data.length) {
    return (
      <div className="container mx-auto">
        <p>Loading...</p>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    if (sortCriteria === "name") {
      return sortDirection === "asc"
        ? a.formName.localeCompare(b.formName)
        : b.formName.localeCompare(a.formName);
    } else if (sortCriteria === "createDate") {
      const dateA = new Date(a.createDate).getTime();
      const dateB = new Date(b.createDate).getTime();

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  return (
    <div dir="rtl" className="container mx-auto">
      <div className="flex gap-4">
        <p>מיון לפי:</p>
        <select
          id="sortBy"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="border border-black text-center"
        >
          <option value="name">שם</option>
          <option value="createDate">תאריך הוספה</option>
        </select>

        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
          className="border border-black"
        >
          <option value="desc">סדר יורד</option>
          <option value="asc">סדר עולה</option>
        </select>
      </div>

      <ul>
        {sortedData.map((form) => (
          <li key={form._id} className="space-y-2 ">
            <div className="flex justify-between  mt-2 hover:text-blue-400">
              <Link className="" to={`/form/${form.formName}`}>
                {form.formName}
              </Link>
              <div className="flex gap-12">
                <Link to={`/form/${form.formName}`}>
                  {dateFormat(form.createDate)}
                </Link>
                <RemoveButton
                  onRemove={() => handleDeleteForm(form._id)}
                  text="מחק הצעה"
                ></RemoveButton>
              </div>
            </div>

            <Separator className="bg-gray-300" />
          </li>
        ))}
      </ul>
      <ConfirmationModal
        show={showModal}
        onConfirm={confirmDeleteForm}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default ReadyBidPage;
