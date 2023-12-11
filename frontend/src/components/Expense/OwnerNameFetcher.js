import { useEffect, useState } from "react";
import { ownerDetail } from "../../api/details";

const OwnerNameFetcher = ({ ownerId }) => {
  // console.log("ownerId", ownerId);
    const [ownerName, setOwnerName] = useState("Loading...");
  
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const data = await ownerDetail(ownerId);
          const { name } = data;
          setOwnerName(name);
        } catch (error) {
          console.error("Error fetching owner details:", error);
          setOwnerName("Unknown Owner");
        }
      };
  
      fetchOwnerName();
    }, [ownerId]);
  
    return <p className="capitalize">{ownerName}</p>;
  };
  
  export default OwnerNameFetcher;