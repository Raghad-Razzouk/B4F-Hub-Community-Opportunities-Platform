import { ChangeEvent } from "react";
import { PostCategoryFilter } from "../types";

interface CommunityFiltersProps {
  categoryFilter: PostCategoryFilter;
  onCategoryChange: (category: PostCategoryFilter) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function CommunityFilters({
  categoryFilter,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: CommunityFiltersProps) {
  const categories: PostCategoryFilter[] = [
    "all",
    "announcement",
    "event",
    "community",
    "resource",
  ];

  function handleSearchChange(event:ChangeEvent<HTMLInputElement>)
  {
    onSearchChange(event.target.value);
  }

  return (
    <div className="community-filters">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={categoryFilter === category ? "active" : ""}
          onClick={() => onCategoryChange(category)}>
          {category === "all" ? "All" : category}
        </button>
      ))}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search posts..."
      />
    </div>
  );
}

export default CommunityFilters;
