import { OrderEntity } from "@/utils/entities";
import PopupDialog from "@/views/shared_components/PopupDialog";
import { useNavigate } from "react-router-dom";

interface OrderDetailsProps {
  order: OrderEntity;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const navigate = useNavigate();

  function onCloseDialog() {
    void navigate(-1);
  }

  //  TODO: Need to show all details of the order, including each of their relationship with users/customers
  return (
    <div>
      <PopupDialog isOpen={true} onClose={onCloseDialog} header="Order Detail">
        <div>{order.id} Add details</div>
      </PopupDialog>
    </div>
  );
}
