import { useState } from 'react';
import { Pagination } from './original';

export default function PaginationDemo() {
  const [page, setPage] = useState(5);

  return <Pagination totalPages={15} value={page} onChange={setPage} />;
}
