import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import api from "../../axios/axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import AnimationWrapper from "../Animation-wrapper/AnimationWrapper";
import { Pagination } from "@mui/material";

const EditPass = () => {
  const [passUser, setPassUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const isMobileScreen = useMediaQuery({ maxWidth: 1000 });
  const [load, setLoad] = useState(true);
  const [search, setSearch] = useState({
    search: "",
  });
  const toggleDetails = (index) => {
    setExpandedRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = !newRows[index];
      return newRows;
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log(currentPage + 1);
  };

  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    api.get("/get-entries-count").then((res) => {
      setTotalEntries(res.data);
    });

    getAllUser();
  }, [load, search, currentPage]);
  const entriesPerPage = 10;

  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const getAllUser = () => {
    setLoader(true);
    // const loading = toast.loading("Wait loading all the pass user");

    api
      .post("/get-all-passUser", { search: search.search, page: currentPage })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          // toast.dismiss(loading);
          setPassUser(res.data);
          setLoader(false);
        }
      })
      .catch(({ response: { data } }) => {
        toast.error(data.message);
      });
  };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Navbar />
      <AnimationWrapper>
        <div className="w-full overflow-x-auto">
          {loader && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          <div className="flex justify-end w-full px-4 py-2">
            <input
              name="search"
              value={search.search}
              onChange={handleSearch}
              type="text"
              placeholder="search"
              className="input-box"
            />
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="max-sm:text-[12px]">
                {!isMobileScreen && (
                  <th className="px-2 py-2 max-sm:px-2 max-sm:py-2">SR NO</th>
                )}
                <th className="px-2 py-2 max-sm:px-2 max-sm:py-2">ID</th>
                <th className="px-2 py-2 max-sm:px-2 max-sm:py-2">Full Name</th>
                {!isMobileScreen && <th className="px-2 py-2">Mobile No</th>}
                {!isMobileScreen && <th className="px-2 py-2">Email</th>}
                {!isMobileScreen && <th className="px-2 py-2">Category</th>}
                {!isMobileScreen && <th className="px-2 py-2">Status</th>}
                <th className="px-2 py-2 max-sm:px-2 max-sm:py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <AnimationWrapper > */}
              {passUser.map((user, i) => (
                <React.Fragment key={i}>
                  <tr
                    className={`hover:bg-blue-200 transition-all duration-300 max-sm:text-[12px] ${
                      isMobileScreen && expandedRows[i]
                        ? "border-b-2 border-blue-300"
                        : ""
                    }`}
                  >
                    {!isMobileScreen && (
                      <td className="border px-2 py-2 text-center">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: i * 0.1 }}
                        >
                          {i + 1}
                        </AnimationWrapper>
                      </td>
                    )}
                    <td className="border px-2 py-2 max-sm:text-[12px] max-sm:px-2 max-sm:py-2">
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                      >
                        {user.id}
                      </AnimationWrapper>
                    </td>
                    <td className="border px-2 py-2 max-sm:px-2 max-sm:py-2">
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                      >
                        {user.fname + " " + user.lname}
                      </AnimationWrapper>
                    </td>
                    {!isMobileScreen && (
                      <td className="border px-2 py-2">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: i * 0.1 }}
                        >
                          {user.mobno}
                        </AnimationWrapper>
                      </td>
                    )}
                    {!isMobileScreen && (
                      <td className="border px-2 py-2">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: i * 0.1 }}
                        >
                          {user.email}
                        </AnimationWrapper>
                      </td>
                    )}
                    {!isMobileScreen && (
                      <td className="border px-2 py-2 text-center">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: i * 0.1 }}
                        >
                          {user.category}
                        </AnimationWrapper>
                      </td>
                    )}
                    {!isMobileScreen && (
                      <td className="border px-2 py-2">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: i * 0.1 }}
                        >
                          {user.status == false
                            ? "Yet to arrived"
                            : "Checked in"}
                        </AnimationWrapper>
                      </td>
                    )}
                    <td className="border px-2 py-2">
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                      >
                        {isMobileScreen ? (
                          <button onClick={() => toggleDetails(i)}>
                            <i className="fa-solid fa-circle-down text-xl text-blue-700 text-center"></i>
                          </button>
                        ) : (
                          <div className="flex flex-col justify-center items-center gap-2 ">
                            <i
                              onClick={() => navigate(`/send-pass/${user._id}`)}
                              class="fa-solid fa-pen-to-square text-red-600 hover:scale-150 duration-75"
                            ></i>
                          </div>
                        )}
                      </AnimationWrapper>
                    </td>
                  </tr>
                  {isMobileScreen && expandedRows[i] && (
                    <tr>
                      <td colSpan={7} className="border px-2 py-2">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: i * 0.1 }}
                        >
                          <p className="font-bold inline-block">Mobile No :</p>{" "}
                          {user.mobno}, <br></br>
                          <p className="font-bold inline-block"> Email:</p>{" "}
                          {user.email}, <br></br>
                          <p className="font-bold inline-block">
                            Category:{" "}
                          </p>{" "}
                          {user.category},<br></br>{" "}
                          <p className="font-bold inline-block">Status: </p>
                          {user.status == true
                            ? "Checked In"
                            : "Yet To Arrived"}{" "}
                          <br></br>
                          <div className="flex py-4 px-2  w-fit   items-center gap-8 ">
                            <i
                              onClick={() => navigate(`/send-pass/${user._id}`)}
                              class="fa-solid fa-pen-to-square text-red-600"
                            ></i>
                          </div>
                        </AnimationWrapper>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {/* </AnimationWrapper> */}
            </tbody>
          </table>

          <div className="w-full flex justify-end py-4 ">
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              count={totalPages}
              color="primary"
            />
          </div>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default EditPass;
