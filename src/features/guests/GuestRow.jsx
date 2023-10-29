import PropTypes from "prop-types";
import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";

import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CreateGuestForm from "./CreateGuestForm";
import { Flag } from "../../ui/Flag";

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Nationality = styled.div`
  gap: 1.2rem;
  display: flex;
  align-items: center;

  &:first-child {
    width: 19px;
    height: 13px;
  }
`;

GuestRow.propTypes = {
  guest: PropTypes.object,
};

function GuestRow({ guest }) {
  const { id: guestId, fullName, tel, nationality, countryFlag } = guest;

  return (
    <Table.Row>
      <div>{guestId}</div>
      <Guest>{fullName}</Guest>
      <div>{tel}</div>
      <Nationality>
        <Flag src={countryFlag} alt={`${nationality}国旗`} />
        <div>{nationality}</div>
      </Nationality>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={guestId} />

          <Menus.List id={guestId}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>编辑</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateGuestForm guestToedit={guest} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default GuestRow;
