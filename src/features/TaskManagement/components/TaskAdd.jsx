// import React from "react";
// import {
//   Card,
//   Input,
//   Typography,
//   Select,
//   Option,
//   Button,
// } from "@material-tailwind/react";
// import DatePicker from "../../../components/DatePicker";
// const TaskManagement = () => {
//   const [formData, setFormData] = React.useState({
//     taskName: "",
//     assignee: "",
//     dueDate: "", // Added dueDate to formData
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add validation and submission logic here
//     console.log(formData);
//   };

//   return (
//     <div className="flex">
//       <section className="w-fit px-8 py-20 container">
//         <form onSubmit={handleSubmit}>
//           <Typography variant="h5" color="blue-gray">
//             Task Assignment{" "}
//           </Typography>
//           <Typography
//             variant="small"
//             className="text-gray-600 font-normal mt-1"
//           >
//             Please enter the necessary information.{" "}
//           </Typography>
//           <div className="flex flex-col mt-8">
//             <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
//               <div className="w-full">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="mb-2 font-medium"
//                 >
//                   Task Name
//                 </Typography>
//                 <Input
//                   size="lg"
//                   placeholder="Enter task name"
//                   name="taskName"
//                   onChange={handleChange}
//                   className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
//                 />
//               </div>
//               <div className="w-full">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="mb-2 font-medium"
//                 >
//                   Assignee
//                 </Typography>
//                 <Select
//                   size="lg"
//                   name="assignee"
//                   onChange={handleChange}
//                   className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
//                 >
//                   <Option>User1</Option>
//                   <Option>User2</Option>
//                   <Option>User3</Option>
//                 </Select>
//               </div>
//             </div>
//             <div className="mb-6 flex flex-col gap-4 md:flex-row">
//               <div className="w-full">
//                 <DatePicker
//                   field={{
//                     label: "Due Date",
//                     name: "dueDate",
//                     placeholder: "Select a date",
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="mt-8">
//               <Button type="submit" className="btn-primary">
//                 Submit
//               </Button>
//             </div>
//           </div>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default TaskManagement;
