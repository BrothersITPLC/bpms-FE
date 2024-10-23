import Barchart from "../../../../components/charts/Barchart";

const UsersBid = () => {
  const data = [80, 12, 50, 10];
  const categories = ["Yohannes", "Kbruysfa", "Seblewongel", "Fasika"];
  const color = "#020617";

  return (
    <Barchart
      title="Bids by Employees"
      description="Here is the visual representation of bids by Employees."
      data={data}
      categories={categories}
      color={color}
    />
  );
};

export default UsersBid;
