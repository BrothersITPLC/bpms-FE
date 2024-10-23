import Piechart from "../../../../components/charts/Piechart";

const CompanyBids = () => {
  const data = [25, 12, 15, 4, 3];
  const labels = [
    "EtSwitch",
    "Selale University",
    "Hope University College",
    "Brhanena Selam Printing Enterprise",
    "Hadmis Hotel",
  ];
  const colors = ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"];

  return (
    <Piechart
      title="Bids by Clients"
      description="Here is the visual representation of clients we propose to frequently."
      data={data}
      labels={labels}
      colors={colors}
    />
  );
};

export default CompanyBids;
