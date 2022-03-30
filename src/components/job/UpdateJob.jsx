import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useJob } from '../../hooks/useJob';
import { 
  jobTypeOptions, 
  educationOptions, 
  experienceOptions, 
  industryOptions 
} from './data'; 

const UpdateJob = ({ job, accessToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [positions, setPositions] = useState('');
  const [company, setCompany] = useState('');
  const [jobType, setJobType] = useState('Permanent');
  const [education, setEducation] = useState('Bachelors');
  const [industry, setIndustry] = useState('Business');
  const [experience, setExperience] = useState('No Experience');

  const router = useRouter();

  const { 
    clearErrors, 
    error, 
    loading, 
    updated, 
    setUpdated, 
    updateJob 
  } = useJob();

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setEmail(job.email);
      setAddress(job.address);
      setSalary(job.salary);
      setPositions(job.positions);
      setCompany(job.company);
      setJobType(job.jobType);
      setEducation(job.education);
      setIndustry(job.industry);
      setExperience(job.experience);
    }
  }, [job]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors()
    }
    if (updated) {
      setUpdated(false);
      toast.success('Job created.');
      router.push(`/jobs/${job.id}`);
    }
  }, [error, clearErrors, updated, setUpdated, router, job]);

  const submitHandler = evt => {
    evt.preventDefault();
    const data = {
      title,
      description,
      email,
      address,
      salary,
      positions,
      company,
      jobType,
      education,
      industry,
      experience
    }
    updateJob({ id: job.id, data, accessToken });
  }

  return (
    <div className="newJobcontainer">
      <div className="formWrapper">
        <div className="headerWrapper">
          <div className="headerLogoWrapper"></div>
          <h1>
            <i aria-hidden className="fas fa-copy mr-2"></i> UPDATE JOB
          </h1>
        </div>
        <form className="form" onSubmit={submitHandler}>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fab fa-tumblr"></i>
                  <input 
                    type="text" 
                    placeholder="Enter Job Title" 
                    required 
                    value={title}
                    onChange={(evt) => setTitle(evt.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-file-medical-alt"></i>
                  <textarea
                    className="description"
                    type="text"
                    placeholder="Enter Job Description"
                    required
                    value={description}
                    onChange={(evt) => setDescription(evt.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    pattern="\S+@\S+\.\S+"
                    title="Your email is invalid"
                    required
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <input 
                    type="text" 
                    placeholder="Enter Address" 
                    required 
                    value={address}
                    onChange={(evt) => setAddress(evt.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-dollar-sign"></i>
                  <input
                    type="number"
                    placeholder="Enter Salary"
                    required
                    value={salary}
                    onChange={(evt) => setSalary(evt.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-users"></i>
                  <input
                    type="number"
                    placeholder="Enter No. of Positions"
                    required
                    value={positions}
                    onChange={(evt) => setPositions(evt.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-building"></i>
                  <input
                    type="text"
                    placeholder="Enter Company Name"
                    required
                    value={company}
                    onChange={(evt) => setCompany(evt.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
              <div className="boxWrapper">
                <h4>Job Types:</h4>
                <div className="selectWrapper">
                  <select 
                    className="classic"
                    value={jobType}
                    onChange={(evt) => setJobType(evt.target.value)}
                  >
                    {jobTypeOptions.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Education:</h4>
                <div className="selectWrapper">
                  <select 
                    className="classic"
                    value={education}
                    onChange={(evt) => setEducation(evt.target.value)}
                  >
                    {educationOptions.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                    <option>Masters</option>
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Industry:</h4>
                <div className="selectWrapper">
                  <select 
                    className="classic"
                    value={industry}
                    onChange={(evt) => setIndustry(evt.target.value)}
                  >
                    {industryOptions.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Experience:</h4>
                <div className="selectWrapper">
                  <select 
                    className="classic"
                    value={experience}
                    onChange={(evt) => setExperience(evt.target.value)}
                  >
                    {experienceOptions.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col text-center mt-3">
              <button className="createButton">
                {loading ? 'Updating...' : 'Update Job'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
