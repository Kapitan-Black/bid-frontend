import { useGetMainBidForms } from "@/api/MainFormApi";

const ReadyBidPage = () => {
  const { data } = useGetMainBidForms()
  console.log(data)


    return (
        <div>הצאות מוכנות...</div>
  )
}

export default ReadyBidPage;