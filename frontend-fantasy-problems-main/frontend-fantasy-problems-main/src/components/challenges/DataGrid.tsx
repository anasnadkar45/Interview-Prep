
import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, 
  ChevronsLeft, ChevronsRight, Search, X 
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

type SortDirection = 'asc' | 'desc';

interface SortConfig {
  key: keyof User;
  direction: SortDirection;
}

const DataGrid: React.FC = () => {
  // Sample data for the data grid
  const initialData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2023-11-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', lastLogin: '2023-11-08' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', role: 'User', status: 'inactive', lastLogin: '2023-10-30' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'active', lastLogin: '2023-11-12' },
    { id: 5, name: 'Robert Wilson', email: 'robert@example.com', role: 'Editor', status: 'pending', lastLogin: '2023-11-05' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Admin', status: 'active', lastLogin: '2023-11-09' },
    { id: 7, name: 'David Martinez', email: 'david@example.com', role: 'User', status: 'inactive', lastLogin: '2023-10-15' },
    { id: 8, name: 'Jennifer Taylor', email: 'jennifer@example.com', role: 'Editor', status: 'active', lastLogin: '2023-11-11' },
    { id: 9, name: 'Charles Anderson', email: 'charles@example.com', role: 'User', status: 'pending', lastLogin: '2023-11-02' },
    { id: 10, name: 'Amanda Thomas', email: 'amanda@example.com', role: 'Admin', status: 'active', lastLogin: '2023-11-14' },
    { id: 11, name: 'Daniel Jackson', email: 'daniel@example.com', role: 'User', status: 'active', lastLogin: '2023-11-13' },
    { id: 12, name: 'Laura Garcia', email: 'laura@example.com', role: 'Editor', status: 'inactive', lastLogin: '2023-10-28' },
    { id: 13, name: 'Kevin Lewis', email: 'kevin@example.com', role: 'User', status: 'active', lastLogin: '2023-11-06' },
    { id: 14, name: 'Karen White', email: 'karen@example.com', role: 'Editor', status: 'active', lastLogin: '2023-11-07' },
    { id: 15, name: 'Steven Harris', email: 'steven@example.com', role: 'Admin', status: 'pending', lastLogin: '2023-11-01' },
  ];
  
  // State for data grid
  const [data] = useState<User[]>(initialData);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'asc' });
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Handle sorting
  const handleSort = (key: keyof User) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    // First filter the data
    const filtered = data.filter(item => {
      const searchText = filterText.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        item.role.toLowerCase().includes(searchText) ||
        item.status.toLowerCase().includes(searchText)
      );
    });
    
    // Then sort the filtered data
    return [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, filterText, sortConfig]);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  // Handle rows per page change
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = parseInt(e.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };
  
  // Clear filter
  const handleClearFilter = () => {
    setFilterText('');
  };
  
  // Render status badge
  const renderStatusBadge = (status: User['status']) => {
    const badgeClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[status]}`}>
        {status}
      </span>
    );
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Data Grid</h2>
      
      {/* Filter and controls */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-10 py-2 border rounded-md w-full md:w-64"
          />
          {filterText && (
            <button
              onClick={handleClearFilter}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border rounded p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          
          <span>
            {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length}
          </span>
        </div>
      </div>
      
      {/* Data grid table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-muted/50">
                {(["id", "name", "email", "role", "status", "lastLogin"] as const).map(key => (
                  <th 
                    key={key}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <ArrowUpDown size={14} className={sortConfig.key === key ? 'opacity-100' : 'opacity-30'} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {paginatedData.length > 0 ? (
                paginatedData.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{user.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">{user.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{user.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{user.role}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {renderStatusBadge(user.status)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{user.lastLogin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-1 rounded border text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="First page"
            >
              <ChevronsLeft size={16} />
            </button>
            
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded border text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = currentPage;
              
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(pageNum)}
                  className={`h-8 w-8 rounded text-sm flex items-center justify-center ${
                    currentPage === pageNum 
                      ? 'bg-primary text-primary-foreground' 
                      : 'border hover:bg-muted'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded border text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
            
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded border text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Last page"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
