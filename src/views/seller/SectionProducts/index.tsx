import { useState } from "react";
import Head from "./Head";
import { useParams } from "react-router-dom";
import CreateProduct from "./ProductDetail";
import ProductTable from "./ProductTable";
import { faker } from "@faker-js/faker";
import { ProductEntity } from "@/utils/entities";
import { getRandomInt } from "@/utils/numbers";
import Pagination from "@/views/shared_components/Pagination";

const itemsPerPageOptions = [10, 20, 30, 40];

// TODO: use real data
const productStats: ProductEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  createdAt: faker.date.recent(),
  name: faker.commerce.product(),
  brand: faker.company.name(),
  category: "outdoor",
  stock: faker.number.int({ min: 0, max: 100 }),
  price: Number(faker.commerce.price()),
  discount: faker.number.float({ min: 0, max: 100, multipleOf: 0.1 }),
  description: faker.lorem.sentences(),
  images: Array.from({ length: getRandomInt(1, 9) }, () =>
    faker.image.avatar()
  ),
}));

// TODO: provide filtering by discounted status
export default function SectionProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page

  const { productId } = useParams();

  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
  }

  return (
    <div>
      {productId ? (
        <CreateProduct productId={productId} productStats={productStats} />
      ) : (
        <>
          <Head
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={itemsPerPageOptions}
          />
          <ProductTable
            productStats={productStats.slice(start_index, end_index)}
          />
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={Math.ceil(productStats.length / itemsPerPage)}
              maxPageOptionsCount={5}
            />
          </div>
        </>
      )}
    </div>
  );
}
