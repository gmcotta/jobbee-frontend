import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';

import JobItem from './job/JobItem';
import Filters from './layout/Filters';

const Home = ({ data }) => {
  const router = useRouter();
  const { keyword, page = 1 } = router.query;
  const { jobs, count, itemPerPage } = data;
  let queryParams;
  if (typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search);
  }
  const handlePageClick = (currentPage) => {
    if (queryParams.has('page')) {
      queryParams.set('page', currentPage);
    } else {
      queryParams.append('page', currentPage);
    }
    router.push({
      search: queryParams.toString()
    });
  }

  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <Filters />
        </div>

        <div className="col-xl-9 col-lg-8 content-left-offset">
          <div className="my-5">
            <h4 className="page-title">{
              keyword 
                ? `${jobs.length} result(s) for ${keyword}` 
                : 'Latest Jobs'
            }</h4>
            <Link passHref href="/stats">
              <button className="btn btn-secondary float-right stats_btn">
                Get Topic stats
              </button>
            </Link>
            <div className="d-block">
              <Link passHref href="/search">Go to Search</Link>
            </div>
          </div>
          {jobs && jobs.map(job => (
            <JobItem key={job.id} job={job} />
          ))}
          {itemPerPage < count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={Number(page)}
                itemsCountPerPage={itemPerPage}
                totalItemsCount={count}
                onChange={handlePageClick}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;
