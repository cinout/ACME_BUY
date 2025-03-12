import { PaymentStatusEnum } from "@/utils/enums";
import { OrderStatusEnum } from "@/graphql/orderGql";
import { joinUrl } from "@/utils/strings";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";

// TODO: fetch from backend
const orderStats = [
  {
    id: faker.string.uuid(),
    price: faker.commerce.price(),
    payment_status: PaymentStatusEnum.Pending,
    order_status: OrderStatusEnum.Pending,
  },
  {
    id: faker.string.uuid(),
    price: faker.commerce.price(),
    payment_status: PaymentStatusEnum.Pending,
    order_status: OrderStatusEnum.Pending,
  },
  {
    id: faker.string.uuid(),
    price: faker.commerce.price(),
    payment_status: PaymentStatusEnum.Pending,
    order_status: OrderStatusEnum.Pending,
  },
];

export default function RecentOrders() {
  return (
    <div className="w-full bg-white/5 rounded-2xl px-4 py-2 mt-4 text-white">
      {/* Header */}
      <div className="flex justify-between font-semibold mb-3">
        <span>Recent Orders</span>

        <Link to="/admin/orders">View all</Link>
        {/* TODO: implement View all */}
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Price</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Order Status</th>
            <th scope="col">Action</th>
            {/* TODO: what does Active mean? */}
          </tr>
        </thead>

        <tbody>
          {orderStats.map((order) => (
            <tr key={order.id}>
              <td scope="row" className="py-2">
                {order.id}
              </td>
              <td className="py-2">{"AU$ " + order.price}</td>
              <td className="py-2">{order.payment_status}</td>
              <td className="py-2">{order.order_status}</td>
              <td className="py-2">
                <Link
                  to={joinUrl("/admin/orders", order.id)}
                  className="bg-slate-100 text-sky-900 border-2 border-slate-300 rounded-md px-1 hover:bg-sky-200 hover:border-sky-500"
                >
                  View
                </Link>
              </td>
              {/* TODO: need to implement */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
