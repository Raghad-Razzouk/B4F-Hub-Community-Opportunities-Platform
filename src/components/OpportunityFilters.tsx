import { ChangeEvent } from "react";
import {
  OpportunityTypeFilter,
  WorkModeFilter,
} from "../types";

interface OpportunityFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  typeFilter: OpportunityTypeFilter;
  onTypeChange: (value: OpportunityTypeFilter) => void;
  workModeFilter: WorkModeFilter;
  onWorkModeChange: (value: WorkModeFilter) => void;
}

function OpportunityFilters({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeChange,
  workModeFilter,
  onWorkModeChange,
}: OpportunityFiltersProps) {
  function handleSearchChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    onSearchChange(event.target.value);
  }

  function handleTypeChange(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    onTypeChange(
      event.target.value as OpportunityTypeFilter,
    );
  }

  function handleWorkModeChange(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    onWorkModeChange(
      event.target.value as WorkModeFilter,
    );
  }

  return (
    <div className="opportunity-filters">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search opportunities..."
      />

      <select
        value={typeFilter}
        onChange={handleTypeChange}
      >
        <option value="all">All types</option>
        <option value="job">Job</option>
        <option value="internship">Internship</option>
        <option value="scholarship">Scholarship</option>
        <option value="volunteer">Volunteer</option>
      </select>

      <select
        value={workModeFilter}
        onChange={handleWorkModeChange}
      >
        <option value="all">All work modes</option>
        <option value="remote">Remote</option>
        <option value="hybrid">Hybrid</option>
        <option value="on-site">On-site</option>
      </select>
    </div>
  );
}

export default OpportunityFilters;