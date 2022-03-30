import React, { useEffect } from 'react';
import Link from 'next/link';
import DataTable from 'react-data-table-component';

import { useJob } from '../../hooks/useJob';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const MyJobs = ({ jobs, accessToken }) => {
  const router = useRouter();
  const { 
    clearErrors, 
    error, 
    loading, 
    deleted, 
    setDeleted, 
    deleteJob 
  } = useJob();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (deleted) {
      setDeleted(false);
      router.push(router.asPath);
    }
  }, [clearErrors, error, deleted, setDeleted, router]);

  const deleteJobHandler = (id) => {
    deleteJob({ id, accessToken });
  }

  const columns = [
    {
      name: 'Job ID',
      sortable: true,
      selector: row => row.id
    },
    {
      name: 'Job name',
      sortable: true,
      selector: row => row.title
    },
    {
      name: 'Salary',
      sortable: true,
      selector: row => row.salary
    },
    {
      name: 'Action',
      sortable: true,
      selector: row => row.action
    },
  ];
  const data = [];

  jobs && jobs.forEach(item => {
    data.push({
      id: item.id,
      title: item.title,
      salary: item.salary,
      action: (
        <>
          <Link href={`/jobs/${item.id}`}>
            <a className="btn btn-primary mr-2">
              <i aria-hidden className="fa fa-eye"></i>
            </a>
          </Link>
          <Link href={`/employer/jobs/candidates/${item.id}`}>
            <a className="btn btn-success mr-2">
              <i aria-hidden className="fa fa-users"></i>
            </a>
          </Link>
          <Link href={`/employer/jobs/${item.id}`}>
            <a className="btn btn-info mr-2">
              <i aria-hidden className="fa fa-pencil"></i>
            </a>
          </Link>
          <button 
            className="btn btn-danger" 
            onClick={() => deleteJobHandler(item.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      )
    });
  });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5">My created jobs</h4>
        <DataTable columns={columns} data={data} pagination />
      </div>
      <div className="col-2"></div>
    </div>
  )
}

export default MyJobs;
