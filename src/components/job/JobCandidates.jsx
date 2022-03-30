import React from 'react';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import { convertISODateToDDMMYYYY } from '../../utils/dateUtils';

const JobCandidates = ({ candidatesApplied }) => {
  const columns = [
    {
      name: 'Job Name',
      sortable: true,
      selector: row => row.title
    },
    {
      name: 'UserId',
      sortable: true,
      selector: row => row.id
    },
    {
      name: 'Candidate Resume',
      sortable: true,
      selector: row => row.resume
    },
    {
      name: 'Applied At',
      sortable: true,
      selector: row => row.appliedAt
    },
  ];
  const data = [];
  candidatesApplied && candidatesApplied.forEach(item => {
    data.push({
      title: item.job.title,
      id: item.user,
      resume: (
        <a
          href={`${process.env.NEXT_PUBLIC_S3_URL}/${item.resume}`}
          className="text-success ml-4"
          rel="noreferrer"
          target="_blank"
        >
          <b>
            <i aria-hidden className="fas fa-download"></i> View Resume
          </b>
        </a>
      ),
      appliedAt: convertISODateToDDMMYYYY(item.appliedAt)
    });
  });
  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5">
          {candidatesApplied && `${candidatesApplied.length} candidate(s) applied to this job`}
        </h4>
        <DataTable columns={columns} data={data} pagination />
      </div>
      <div className="col-2"></div>
    </div>
  )
}

export default JobCandidates;
