import { useState } from "react";
import { faker } from "@faker-js/faker";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import SellerTable from "./SellerTable";
import SellerInfo from "./SellerInfo";
import { useParams } from "react-router-dom";
import { SellerEntity, ShopEntity } from "@/utils/entities";
import { getRandomInt } from "@/utils/numbers";
import { SellerStatusEnum } from "@/utils/enums";

// TODO: fetch from server
const sellerStats: SellerEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  image: faker.image.avatar(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  country: faker.location.country(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipCode: faker.location.zipCode(),
  status: SellerStatusEnum.Active,
  requestDate: faker.date.recent(),
  shops: Array.from(
    { length: getRandomInt(0, 14) },
    () =>
      ({
        id: faker.string.uuid(),
        name: faker.company.name(),
        image: faker.image.avatar(),
      } as ShopEntity)
  ),
}));

const itemsPerPageOptions = [10, 20, 30, 40];

// TODO: need to provide filter/sort functionalities
// TODO: only show activated and deactivated sellers, pending sellers are in Seller Request tab
export default function SectionSellers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page

  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;
  const { sellerId } = useParams();

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
    // setDetailShown([]); // hide all shown details
  }

  return (
    <>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
      />

      <SellerTable sellerStats={sellerStats.slice(start_index, end_index)} />

      {sellerId && (
        <SellerInfo seller={sellerStats.find((a) => a.id === sellerId)!} />
      )}

      {/* Pagination */}
      {/* TODO: is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(sellerStats.length / itemsPerPage)}
          maxPageOptionsCount={5}
        />
      </div>
    </>
  );
}
