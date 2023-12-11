import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AmountFetcher = ({ members }) => {
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo?.profile?.id;
//   console.log(userId);
//   console.log(members);
  
  const [amount, setAmount] = useState("Loading...");

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        // Find the corresponding member for the current user in the members array
        const currentUserMember = members.find((m) => m.userId === userId);
        setAmount(currentUserMember ? currentUserMember.amount : "Not found");
      } catch (error) {
        console.error("Error fetching amount:", error);
        setAmount("Error fetching amount");
      }
    };

    fetchAmount();
  }, [userId, members]);

  return <span>Rs. {amount}</span>;
};

export default AmountFetcher;