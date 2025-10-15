import React from 'react';

const PartnerCategory = ({ categoryName, partners }) => {
  return (
    <div className="partner-category">
      <h3>{categoryName}</h3>
      <div className="partners-grid">
        {partners.map((partner, index) => (
          <div key={`${categoryName}-${partner.name}-${index}`} className="partner-card">
            <img src={partner.logo} alt={partner.name} />
            <p className="partner-name">{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCategory;
