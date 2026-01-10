import { useContext, useState } from "react";
import WebContext from "../../../Context/WebContext";
import auth from "../../../Firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";
import {
  MdOutlinePhotoCamera,
  MdOutlineBadge,
  MdOutlineEmail,
  MdUpdate,
  MdVerifiedUser,
} from "react-icons/md";

const MyProfile = () => {
  const { userName, setUserName, userImage, setUserImage, user, theme } =
    useContext(WebContext);
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);
  const [isImageSubmitting, setIsImageSubmitting] = useState(false);

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    theme: theme === "dark" ? "dark" : "light",
  };

  const updateName = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setIsNameSubmitting(true);
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        toast.success(`Name updated successfully!`, toastConfig);
        setUserName(name);
        setIsNameSubmitting(false);
        e.target.reset();
      })
      .catch((error) => {
        toast.error(`Update failed: ${error.message}`, toastConfig);
        setIsNameSubmitting(false);
      });
  };

  const updateImage = (e) => {
    e.preventDefault();
    const imageURL = e.target.imageURL.value;
    setIsImageSubmitting(true);
    updateProfile(auth.currentUser, { photoURL: imageURL })
      .then(() => {
        toast.success(`Photo updated successfully!`, toastConfig);
        setUserImage(imageURL);
        setIsImageSubmitting(false);
        e.target.reset();
      })
      .catch((error) => {
        toast.error(`Photo update failed: ${error.message}`, toastConfig);
        setIsImageSubmitting(false);
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-700">
      <HeadProvider>
        <Title>Profile || ScholarStream</Title>
      </HeadProvider>

      {/* Profile Header Card */}
      <div
        className={`relative overflow-hidden rounded-[2.5rem] border transition-all mb-10 ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
        }`}
      >
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-sky-500 to-indigo-600 opacity-20"></div>

        <div className="relative pt-16 pb-10 flex flex-col items-center gap-4">
          <div className="relative group">
            <img
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-sky-500/20"
              src={userImage || "https://i.ibb.co/jZ67CdJ2/download.jpg"}
              alt={userName}
            />
            <div className="absolute bottom-2 right-2 bg-sky-500 p-2 rounded-full text-white shadow-lg">
              <MdVerifiedUser size={20} />
            </div>
          </div>

          <div className="text-center">
            <h2
              className={`text-2xl md:text-3xl font-black tracking-tight ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {userName || "Scholar User"}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1 opacity-60">
              <MdOutlineEmail />
              <p className="text-sm md:text-base font-medium">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* Name Update Form */}
        <div
          className={`p-8 rounded-4xl border ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100 shadow-lg"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
              <MdOutlineBadge size={24} />
            </div>
            <h3 className="font-bold text-lg uppercase tracking-wider opacity-70">
              Update Name
            </h3>
          </div>

          <form onSubmit={updateName} className="flex flex-col gap-4">
            <div className="relative">
              <input
                required
                name="name"
                type="text"
                placeholder="Enter new display name"
                className={`w-full py-4 px-5 rounded-2xl border outline-none transition-all ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700 focus:border-sky-500 text-white"
                    : "bg-gray-50 border-gray-200 focus:border-sky-500"
                }`}
              />
            </div>
            <button
              disabled={isNameSubmitting}
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isNameSubmitting ? (
                <span className="animate-pulse text-xs">Processing...</span>
              ) : (
                <>
                  <MdUpdate size={18} /> Update Name
                </>
              )}
            </button>
          </form>
        </div>

        {/* Photo Update Form */}
        <div
          className={`p-8 rounded-4xl border ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100 shadow-lg"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <MdOutlinePhotoCamera size={24} />
            </div>
            <h3 className="font-bold text-lg uppercase tracking-wider opacity-70">
              Update Photo
            </h3>
          </div>

          <form onSubmit={updateImage} className="flex flex-col gap-4">
            <input
              required
              name="imageURL"
              type="text"
              placeholder="Paste new photo URL"
              className={`w-full py-4 px-5 rounded-2xl border outline-none transition-all ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700 focus:border-indigo-500 text-white"
                  : "bg-gray-50 border-gray-200 focus:border-indigo-500"
              }`}
            />
            <button
              disabled={isImageSubmitting}
              className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isImageSubmitting ? (
                <span className="animate-pulse text-xs">Processing...</span>
              ) : (
                <>
                  <MdUpdate size={18} /> Update Photo
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
