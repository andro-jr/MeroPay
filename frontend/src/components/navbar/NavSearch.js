import React, { useContext, useState, useEffect } from "react";

import { FiSearch } from "react-icons/fi";
import { AuthContext } from "../../context/AuthProvider";
import { searchFriend } from "../../api/friend";
import ModalBox from "../ModalBox";

const NavSearch = ({}) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // console.log(typeof(searchResult));
  
  useEffect(() => {
    console.log(typeof(searchResult));
  },[])

  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;

  const handleChange = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearch(value);
    const { user, error } = await searchFriend(value, userId);
    setSearchResult(user);
    console.log(user);
    if (user) {
      console.log("user vetyo hai");
    }
  };

  return (
    <div>
      <div className="search-bar">
        <form action="" className="w-full">
          <input
            className="relative"
            placeholder="search for users"
            value={search}
            onChange={handleChange}
          />
          <FiSearch className="absolute top-1/2 left-8 -translate-y-1/2 text-gray-500" />
        </form>
        <div className="search-result">
          {/* {searchResult &&
            searchResult.map((user, index) => <div>{user.name}</div>)} */}
        </div>
      </div>
    </div>
  );
};

export default NavSearch;
