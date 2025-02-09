import { useState } from "react";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="Search courses..."
                className="p-2 rounded-md bg-gray-700 text-white w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-purple-500 w-25 text-white rounded-lg"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
