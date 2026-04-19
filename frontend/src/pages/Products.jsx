import React, { useEffect, useState } from "react";
import PageTitle from "../Components/PageTitle";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import Product from "../Components/Product";
import Pagination from "../Components/Pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Products = () => {
  const { products, productCount, loading, error, resultPerPage } = useSelector(
    (state) => state.product,
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const categoryParam = searchParams.get("category") || "";
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;

  const [currentPage, setCurrentPage] = useState(pageFromURL);

  const totalPages = Math.ceil(productCount / (resultPerPage || 1000));

  //  Sync page with URL
  useEffect(() => {
    setCurrentPage(pageFromURL);
  }, [pageFromURL]);

  //  Handle Pagination
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      const newSearchParams = new URLSearchParams(location.search);

      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }

      navigate(`?${newSearchParams.toString()}`);
    }
  };

  //  Handle Category
  const handleCategory = (cat) => {
    const newSearchParams = new URLSearchParams(location.search);

    newSearchParams.set("category", cat);
    newSearchParams.delete("page"); // reset page
    if (cat == "All") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", cat);
    }

    navigate(`?${newSearchParams.toString()}`);
  };

  //  Fetch Products
  useEffect(() => {
    dispatch(
      getProduct({
        keyword,
        category: categoryParam,
        page: currentPage,
      }),
    );
  }, [dispatch, keyword, categoryParam, currentPage]);

  //  Error handling
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Products not found");
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageTitle title={"Products | E-Commerce"} />
      <Navbar />

      <main className="grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="bg-blue-200 p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 border-blue-500">
                Categories
              </h3>

              <ul className="space-y-2">
                {["All", "Electronics", "Fashion", "Home Decor", "Books"].map(
                  (cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategory(cat)}
                        className={`${
                          categoryParam === cat
                            ? "text-blue-600 font-bold"
                            : "text-gray-700"
                        } hover:text-blue-500 transition-colors cursor-pointer`}
                      >
                        {cat}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </aside>

          {/* Products */}
          <section className="w-full md:w-3/4 p-4 bg-blue-100 rounded shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Our Products
              </h3>

              <span className="text-gray-500 text-sm">
                {products?.length || 0} items found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>

            {/* No products */}
            {products?.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products Found</p>
              </div>
            )}
          </section>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
