import Contents from "../Contents/Contents";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import UploadContent from "../UploadContent/UploadContent";
import Userspdfs from "../Userspdfs/Userspdfs";
const ProfileHome = () => {
  return (
    <div className="grid grid-cols-3 justify-items-center">
      <div className="w-2/4 ">
        <ProfileInfo></ProfileInfo>
      </div>
      <div className="p-3 ml-5 mt-4 ">
        <UploadContent></UploadContent>
        <Contents></Contents>
      </div>
      <div>
        <Userspdfs></Userspdfs>
      </div>
    </div>
  );
};
export default ProfileHome;
