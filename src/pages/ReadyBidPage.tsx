import { useGetMainBidForms } from "@/api/MainFormApi";
import { MainBidServerResponse } from "@/types/mainBidFormResponse";

const ReadyBidPage = () => {
  const { data, isLoading, error } = useGetMainBidForms();
  // console.log("data====", data);

  if (!data) {
    return []; 
  }

  const flattenAndSortBidForm = (bidForm: MainBidServerResponse[]) => {
    return bidForm.map((form) => {
      // Flatten the elements into a single array for each form
      const flattenedElements = [
        ...form.flight.map((f) => ({ ...f, type: "flight" })),
        ...form.hotel.map((h) => ({ ...h, type: "hotel" })),
        ...form.transfer.map((t) => ({ ...t, type: "transfer" })),
        ...form.image.map((i) => ({ ...i, type: "image" })),
      ];
      // console.log("flattenedElements", flattenedElements);

      // Create a map of id positions based on idArray
      const idPositionMap = form.idArray.reduce<Record<string, number>>(
        (acc, id, index) => {
          acc[id] = index;
          return acc;
        },
        {}
      );
      // console.log("idPositionMap", idPositionMap);

      // Sort the elements based on their position in idArray
      const sortedElements = flattenedElements.sort(
        (a, b) => idPositionMap[a.id] - idPositionMap[b.id]
      );
      // console.log("sortedElements===", sortedElements);

      return {
        formName: form.formName,
        sortedElements,
        idArray: form.idArray,
      };
    });
  };

  const processedBidForms = flattenAndSortBidForm(data);
  console.log(processedBidForms);

  return (
    <>
      <div>הצעות מוכנות...</div>
      {processedBidForms && processedBidForms.length > 0 ? (
        processedBidForms.map((bidForm, index) => (
          <div key={index}>
            <h3>{bidForm.formName}</h3>
            <ul>
              {bidForm.sortedElements.map((element, elemIndex) => (
                <li key={elemIndex}>
                  {Object.entries(element).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {String(value)}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div>No bid forms available</div>
      )}
    </>
  );
};

export default ReadyBidPage;
