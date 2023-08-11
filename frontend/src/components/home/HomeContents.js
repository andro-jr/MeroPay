import React, { useContext } from "react";
import DashboardContainer from "../DashboardContainer";
import { AuthContext } from "../../context/AuthProvider";

const HomeContents = ({ name }) => {
  const { authInfo } = useContext(AuthContext);

  const username = authInfo.profile?.name;
  // const useremail = authInfo.profile?.email;
  return (
    <div>
      <DashboardContainer className="">
        HomeContents
      </DashboardContainer>
    </div>
  );
};

export default HomeContents;
