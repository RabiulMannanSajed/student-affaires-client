import Contents from "../Contents/Contents";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import UploadContent from "../UploadContent/UploadContent";
const ProfileHome = () => {
  return (
    <div className="flex justify-center">
      <ProfileInfo></ProfileInfo>
      <div className="p-3 ml-5 mt-4 ">
        <UploadContent></UploadContent>
        <Contents></Contents>
      </div>
    </div>
  );
};

export default ProfileHome;
