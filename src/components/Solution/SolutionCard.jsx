import React from 'react';

// Helper to render text with bold tags
const renderTextWithBold = (text) => {
  if (!text) return null;
  const textWithBreaks = text.replace(/\n/g, '<br />');
  const parts = textWithBreaks.split(/(\*\*.*?\*\*|<br \/>)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part === '<br />') {
        return <br key={index} />;
    }
    return part;
  });
};

const SolutionCard = React.forwardRef(({ solution }, ref) => {
  return (
    <section id={solution.id} className="solution-detail" ref={ref}>
      <div className="container">
        <div className="detail-header">
          <img src={solution.image} alt={solution.title} className="solution-main-image" />
          <h2>{solution.title}</h2>
          <h3>{solution.subtitle}</h3>
          <p className="one-liner">{solution.oneLiner}</p>
        </div>

        <div className="overview">
          <h4>개요</h4>
          <p>{renderTextWithBold(solution.overview)}</p>
        </div>

        <div className="features">
          <h4>주요 기능</h4>
          <div className="features-grid">
            {solution.keyFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-type feature-${feature.type.toLowerCase()}`}>{feature.type}</div>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="strengths">
          <h4>특장점</h4>
          <p>{renderTextWithBold(solution.strengths)}</p>
        </div>

        <div className="workflow">
          <h4>업무 흐름</h4>
          <img src={solution.workflow} alt={`${solution.title} 업무 흐름도`} className="workflow-diagram" />
        </div>
        
        <div className="catchy-phrase">
          <p>{renderTextWithBold(solution.catchyPhrase)}</p>
        </div>
      </div>
    </section>
  );
});

export default SolutionCard;
