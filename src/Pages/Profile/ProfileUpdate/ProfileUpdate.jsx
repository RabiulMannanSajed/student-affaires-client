import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/Authprovider";

const ProfileUpdate = () => {
  const { user } = useContext(AuthContext);
  const handlePostAJob = (event) => {
    event.preventDefault();
    const form = event.target;
    const jobName = form.jobName.value;
    const school = form.school.value;
    const hometown = form.hometown.value;
    const currentCity = form.currentCity.value;
    const relationship = form.relationship.value;

    const makeNewOffice = {
      jobName: jobName,
      school: school,
      hometown: hometown,
      currentCity: currentCity,
      relationship: relationship,
    };
    // TODO : User is not in database right now
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makeNewOffice),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Office created successfully");
        }
      });
  };
  return (
    <div className="w-full">
      <form onSubmit={handlePostAJob}>
        {/* this is for company and job  */}
        {/* company name */}

        <div className="w-2/4 mr-5">
          {" "}
          <label className="label">
            <span className="label-text font-bold text-xl">Company Name </span>
          </label>
          <input
            type="name"
            placeholder="Enter your COmpany name "
            name="companyName"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* School*/}
        <div className="w-2/4 mr-5">
          <label className="label">
            <span className="label-text font-bold text-xl">School Name</span>
          </label>
          <input
            type="name"
            placeholder="Enter Your School Name"
            name="school"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* hometown
         */}
        <div className="w-2/4 mr-5">
          <label className="label">
            <span className="label-text font-bold text-xl">Hometown</span>
          </label>
          <input
            type="name"
            placeholder="HomeTown"
            name="hometown"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* currentCity */}
        <div className="w-2/4 mr-5">
          <label className="label">
            <span className="label-text font-bold text-xl">current City </span>
          </label>
          <input
            type="name"
            placeholder=" CurrentCity"
            name="currentCity"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/*relationship  */}
        <div className="w-2/4 mr-5">
          <label className="label">
            <span className="label-text font-bold text-xl">relationship </span>
          </label>
          <input
            type="name"
            placeholder="When requrting is start"
            name="relationship"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control mt-6">
          <input
            className="btn bg-orange-500 font-semibold text-xl"
            type="submit"
            value="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
