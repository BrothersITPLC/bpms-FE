import Linechart from "../../../../../src/components/charts/Linechart";

const TotalBids = () => {
  const data = [8, 12, 5, 0, 4, 8, 9, 3, 10];
  const categories = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const color = "#020617";

  return (
    <Linechart
      title="Total Bids"
      description="Here is the visual representation of your bids involvements."
      data={data}
      categories={categories}
      color={color}
    />
  );
};

export default TotalBids;
