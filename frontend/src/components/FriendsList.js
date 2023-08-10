import React from "react";
import DashboardContainer from "./DashboardContainer";
import { MdGroup } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import FriendsProfile from "./FriendsProfile";
import FriendsRequest from "./FriendRequest";

const FriendsList = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardContainer>
        <div className="friends-title">
          <h4 className="text-md font-medium">Friends</h4>

          <MdGroup className="text-xl" />
        </div>

        <div className="friends-list">
          <FriendsProfile />
          <FriendsProfile />
          <FriendsProfile />
          <FriendsProfile />
        </div>
      </DashboardContainer>

      <DashboardContainer>
        <div className="friends-title">
          <h4 className="text-md font-medium">Pending Requests</h4>
          <IoPersonAdd className="text-md" />
        </div>
        <div className="request-container">
          <FriendsRequest />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default FriendsList;
