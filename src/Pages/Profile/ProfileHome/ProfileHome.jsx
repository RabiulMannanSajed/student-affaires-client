import ProfileInfo from "../ProfileInfo/ProfileInfo";
import UploadContent from "../UploadContent/UploadContent";

const ProfileHome = () => {
  return (
    <div className="flex justify-around">
      <ProfileInfo></ProfileInfo>
      <UploadContent></UploadContent>
    </div>
  );
};

export default ProfileHome;
