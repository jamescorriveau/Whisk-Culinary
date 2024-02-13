// // Modal.jsx

// import React from "react";

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           padding: "20px",
//           borderRadius: "5px",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           maxWidth: "500px",
//           width: "100%",
//         }}
//       >
//         {children}
//         <button
//           onClick={onClose}
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             border: "none",
//             backgroundColor: "#007bff",
//             color: "#ffffff",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;
