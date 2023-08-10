import React, { useContext, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { AuthContext } from "../../context/AuthProvider";
import { searchFriend } from "../../api/friend";

const NavSearch = () => {
  const [search, setSearch] = useState("");
  const { authInfo } = useContext(AuthContext);
  const { userId } = authInfo;
  console.log(search);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearch(value);

    const payload = {
      query: {
        name: { search },
      },
      userId: { userId },
    };

    console.log(payload);
    searchFriend(payload);
    console.log()
  };

  return (
    <div className="search-bar">
      <input
        className="relative"
        placeholder="search for users"
        value={search}
        onChange={handleChange}
      />
      <FiSearch className="absolute top-1/2 left-8 -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default NavSearch;
