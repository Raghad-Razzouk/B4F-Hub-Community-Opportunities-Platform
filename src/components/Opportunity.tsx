import { useState } from "react";
import { Opportunity } from "../types";

interface OpportunityItemProps {
  opportunity: Opportunity;
  onApply: (id: string) => Promise<void>;
  isSaved: boolean;            
  onToggleSave: (id: string) => void; 
}

function OpportunityItem({ opportunity, onApply, isSaved, onToggleSave }: OpportunityItemProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div className="opportunity-card">
      <div className="opportunity-header">
        
        <div className="opp-company-wrapper">
          
          <div className="company-logo">
            {opportunity.company.substring(0, 2).toUpperCase()}
          </div>
          
          <div className="opp-meta-info">
            <h3>{opportunity.title}</h3>
            <p className="opp-company-name">{opportunity.company}</p>
            <p className="opp-location">{opportunity.location}</p>
          </div>
        </div>

        <span 
          className={`opportunity-star ${isSaved ? 'saved' : ''}`} 
          onClick={() => onToggleSave(opportunity.id)}
        >
          {isSaved ? "★" : "☆"}
        </span>
      </div>

      <div className="opportunity-info">
        <span>{opportunity.type}</span>
        <span>{opportunity.workMode}</span>
      </div>

      <div className="opportunity-skills">
        {opportunity.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      {showDetails && opportunity.description && (
        <div className="opportunity-details-panel">
          <h4>Role Description:</h4>
          <p>{opportunity.description}</p>
          {opportunity.deadline && (
            <p className="opp-deadline">⏳ Deadline: {opportunity.deadline}</p>
          )}
        </div>
      )}

      <div className="opportunity-footer">
        <button 
          type="button" 
          className="details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide details" : "View details"}
        </button>

        <button 
          type="button" 
          className={`apply-btn ${opportunity.applied ? 'applied' : ''}`}
          onClick={() => onApply(opportunity.id)}
          disabled={opportunity.applied}
        >
          {opportunity.applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default OpportunityItem;
