import React, { useContext, useState } from "react";
import DashboardContainer from "../Dashboard/DashboardContainer";
import DashPrimaryHead from "../DashPrimaryHead";
import FormInput from "../Form/FormInput";
import Button from "../Button";
import { AuthContext } from "../../context/AuthProvider";
import { NotificationContext } from "../../context/NotificationProvider";
import { updateUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { TabContext } from "../../context/TabProvider";
import { LoaderContext } from "../../context/LoaderProvider";

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

const validator = (username) => {
  if (!username) return { ok: false, err: "Name is missing" };
  if (containsSpecialChars(username) || username.includes(" "))
    return {
      ok: false,
      err: "Username cannot contain space any special characters.",
    };

  return { ok: true };
};

const Settings = () => {
  const navigate = useNavigate();

  const { authInfo, isAuth } = useContext(AuthContext);
  const { updateNotification } = useContext(NotificationContext);
  const { setShowLoader } = useContext(LoaderContext);
  const { setTabIndex } = useContext(TabContext);
  const avatar = authInfo.profile?.avatar;
  const userId = authInfo.profile?.id;
  const paymentQr = authInfo.profile?.paymentQR;

  const [username, setUsername] = useState(authInfo.profile?.name);

  const [file, setFile] = useState();
  function handleChange(e) {
    if (e.target.files) setFile(URL.createObjectURL(e.target.files[0]));
  }
  const [paymentFile, setPaymentFile] = useState();
  function handlePaymentFileChange(e) {
    if (e.target.files) setPaymentFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ok, err } = validator(username);
    if (err) return updateNotification("error", err);

    const formData = new FormData(e.target);

    setShowLoader(true);

    const { error, message } = await updateUser(formData, userId);

    setShowLoader(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    isAuth();
    setTabIndex(0);
    navigate("/");
  };

  return (
    <DashboardContainer>
      <DashPrimaryHead>Account Settings</DashPrimaryHead>
      <div className="mt-10">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-10">
            <div className="relative">
              <label htmlFor="avatar" className="image-label cursor-pointer">
                <img src={file || avatar} alt="" />
                <div className="avatar-edit-box">
                  <img src="pen.svg" alt="" className="avatar-edit" />
                </div>
              </label>
              <input
                type="file"
                id="avatar"
                className="hidden"
                onChange={handleChange}
                name="avatar"
                accept=".png, .jpg"
              />
            </div>
          </div>
          <div className="relative flex justify-center">
            <label htmlFor="QR" className="cursor-pointer">
              {paymentQr || paymentFile ? (
                <div className="paymentQR_image">
                  <img src={paymentFile || paymentQr} alt="" />
                  <div className="updateOption">
                    <img src="/upload.png" alt="" />
                    <h4 className="mt-5 font-semibold tracking-wide">
                      Update Payment QR
                    </h4>
                  </div>
                </div>
              ) : (
                <div className="QR_label">
                  <img src="/upload.png" alt="" />
                  <h4 className="mt-5 font-semibold tracking-wide">
                    Upload Payment QR
                  </h4>
                </div>
              )}
            </label>
            <input
              type="file"
              id="QR"
              name="QR"
              className="hidden"
              accept=".png, .jpg"
              onChange={handlePaymentFileChange}
            />
          </div>
          <div className="mt-10">
            <FormInput
              placeholder="johndoe"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-end gap-5 mt-10">
            <button
              type="submit"
              className="px-5 py-2 rounded  text-white  transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_primary_button"
            >
              <p className="button_text">Update</p>
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded  text-white  transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_secondary_button"
            >
              <p className="button_text">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </DashboardContainer>
  );
};

export default Settings;
