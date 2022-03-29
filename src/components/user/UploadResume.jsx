import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';

const UploadResume = ({ accessToken }) => {
  const [resume, setResume] = useState(null);

  const {
    loading,
    user,
    error,
    uploaded,
    clearErrors,
    setUploaded,
    uploadResume,
  } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (uploaded) {
      toast.success('Your resume is uploaded.');
      setUploaded(false);
    }
  }, [error, clearErrors, uploaded, setUploaded]);

  const submitHandler = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    uploadResume({ formData, accessToken });
  }

  const onInputChange = (evt) => {
    setResume(evt.target.files[0]);
  }

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              priority="true"
              layout="fill"
              src="/images/resume-upload.svg"
              alt="resume"
            />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> UPLOAD RESUME </h3>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-upload"></i>
                  <input
                    type="file"
                    name="resume"
                    id="customFile"
                    accept="application/pdf"
                    required
                    onChange={onInputChange}
                  />
                </div>
              </div>
              {user && user.resume && (
                <>
                  <h4 className="text-center my-3">OR</h4>
                  <a
                    href={`${process.env.NEXT_PUBLIC_S3_URL}/${user.resume}`}
                    className="text-success ml-4"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <b>
                      <i aria-hidden className="fas fa-download"></i> Download
                      Your Resume
                    </b>
                  </a>
                </>
              )}

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
