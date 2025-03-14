
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const TypeaheadSolution: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Sample data
  const users: User[] = [
    { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
    { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
    { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
    { id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org' },
    { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca' },
    { id: 6, name: 'Mrs. Dennis Schulist', username: 'Leopoldo_Corkery', email: 'Karley_Dach@jasper.info' },
    { id: 7, name: 'Kurtis Weissnat', username: 'Elwyn.Skiles', email: 'Telly.Hoeger@billy.biz' },
    { id: 8, name: 'Nicholas Runolfsdottir V', username: 'Maxime_Nienow', email: 'Sherwood@rosamond.me' },
    { id: 9, name: 'Glenna Reichert', username: 'Delphine', email: 'Chaim_McDermott@dana.io' },
    { id: 10, name: 'Clementina DuBuque', username: 'Moriah.Stanton', email: 'Rey.Padberg@karina.biz' },
  ];
  
  // Search function
  const searchUsers = async (searchQuery: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (searchQuery.trim() === '') {
      setResults([]);
    } else {
      const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredUsers);
    }
    
    setLoading(false);
    setSelectedIndex(-1);
  };
  
  // Debounce function
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setLoading(false);
      return;
    }
    
    const handler = setTimeout(() => {
      searchUsers(query);
    }, 300);
    
    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };
  
  // Handle result selection
  const handleResultClick = (user: User) => {
    setQuery(user.name);
    setShowResults(false);
    // You can also perform some action here like navigating to user profile
    console.log('Selected user:', user);
  };
  
  // Clear input
  const handleClearInput = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <Search size={16} />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="pl-10 pr-10 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              onClick={handleClearInput}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
            </button>
          )}
        </div>
        
        {showResults && (query.trim() !== '' || results.length > 0) && (
          <div 
            ref={resultsRef}
            className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {loading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                <Loader2 size={16} className="animate-spin mx-auto mb-2" />
                Searching...
              </div>
            ) : results.length > 0 ? (
              <ul>
                {results.map((user, index) => (
                  <li
                    key={user.id}
                    onClick={() => handleResultClick(user)}
                    className={`px-4 py-2 cursor-pointer hover:bg-muted transition-colors ${
                      index === selectedIndex ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-muted-foreground">@{user.username}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </li>
                ))}
              </ul>
            ) : query.trim() !== '' ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No users found
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeaheadSolution;
