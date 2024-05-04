import useContent from "../../../hooks/useContent";
import JobsNews from "../JobsNews/JobsNews";

const Jobs = () => {
  //  take all contents and find a query on this
  const [contents, refetch] = useContent();
  const jobSkills = [
    "experience",
    "skills",
    "responsibilities",
    "qualifications",
    "team",
    "opportunity",
    "benefits",
    "salary",
    "apply",
    "deadline",
  ];
  const hasJobSkill = (content) => {
    // Convert content to lowercase for case-insensitive search
    const lowerContent = content.uploadedContent.toLowerCase();
    // Check if any of the job skills are present in the content
    return jobSkills.some((skill) => lowerContent.includes(skill));
  };

  // Filter contents to include only those with job skills
  const jobContents = contents.filter((content) => hasJobSkill(content));
  return (
    <div>
      {jobContents.map((content) => (
        // <div key={content._id}>
        //   {/* Display job content here */}
        //   <p>{content.uploadedContent}</p>
        // </div>
        <JobsNews
          key={content._id}
          content={content}
          refetch={refetch}
        ></JobsNews>
      ))}
    </div>
  );
};

export default Jobs;
