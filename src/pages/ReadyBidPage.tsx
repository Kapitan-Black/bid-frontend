import { useGetMainBidForms } from "@/api/MainFormApi";
import Drag from "@/dragExample/Drag";

const ReadyBidPage = () => {
  const { data } = useGetMainBidForms()
  // console.log(data)


  return (
    <>
      <div>הצאות מוכנות...</div>
      <Drag />
    </>
  );
}

export default ReadyBidPage;