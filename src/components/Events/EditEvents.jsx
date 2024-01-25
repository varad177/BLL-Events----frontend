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

const EditEvents = () => {
  const [passUser, setPassUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const isMobileScreen = useMediaQuery({ maxWidth: 1000 });
  const [load, setLoad] = useState(true);
  const [search, setSearch] = useState({
    search: "",
  });


  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([])
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log(currentPage + 1);
  };

  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    api.get("/get-entries-count", { status: true }).then((res) => {
      setTotalEntries(res.data);
    });

    getAllEvents();
  }, [load, search, currentPage]);
  const entriesPerPage = 10;

  const totalPages = Math.ceil(totalEntries / entriesPerPage);



  const getAllEvents = () => {
    api.get('/get-all-events').then((res) => {

        const loading2 = toast.loading('fetching the events')

        if (res.status === 200) {
            setEvents(res.data)
            toast.dismiss(loading2)
            toast.success("loaded")

        }
    })
}

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
          {/* <div className="flex justify-end w-full px-4 py-2">
            <input
              name="search"
              value={search.search}
              onChange={handleSearch}
              type="text"
              placeholder="search"
              className="input-box"
            />
          </div> */}
          <table className="w-full table-auto">
            <thead>
              <tr className="max-sm:text-[12px]">
                <th className="px-2 py-2 max-sm:px-2 max-sm:py-2">SR NO</th>

                <th className="px-2 py-2 max-sm:px-2 max-sm:py-2">Title</th>
                <th className="px-2 py-2 max-sm:px-2 max-sm:py-2">
                  Check Pass
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <React.Fragment key={i}>
                  <tr
                    className={`hover:bg-blue-200 transition-all duration-300 max-sm:text-[12px] ${
                      isMobileScreen && expandedRows[i]
                        ? "border-b-2 border-blue-300"
                        : ""
                    }`}
                  >
                    <td className="border px-2 py-2 text-center">
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                      >
                        {i + 1}
                      </AnimationWrapper>
                    </td>

                    <td className="border px-2 py-2 max-sm:text-[12px] max-sm:px-2 max-sm:py-2">
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                      >
                        {event.heading}
                      </AnimationWrapper>
                    </td>

                    <td className="border px-2 py-2">
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                      >
                        <div className="flex flex-col justify-center items-center gap-2 ">
                          <i
                            onClick={() =>
                              navigate(`/create-event/${event._id}`)
                            }
                            
                            class="fa-solid fa-pen-to-square text-red-600 hover:scale-150 duration-75"
                          ></i>
                        </div>
                      </AnimationWrapper>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              {/* </AnimationWrapper> */}
            </tbody>
          </table>

          {/* <div className="w-full flex justify-end py-4 ">
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              count={totalPages}
              color="primary"
            />
          </div> */}
        </div>
      </AnimationWrapper>
    </>
  );
};

export default EditEvents;
