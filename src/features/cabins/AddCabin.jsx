// import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-form">
          <Button>添加一个新房型</Button>
        </Modal.Open>
        <Modal.Window name="create-form">
          <CreateCabinForm />
          {/* </Modal.Window>
      <Modal.Window name="cabin">
    <CabinTable /> */}
        </Modal.Window>
      </Modal>
    </div>
  );
}
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((open) => !open)}>
//         添加一个新房型
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
