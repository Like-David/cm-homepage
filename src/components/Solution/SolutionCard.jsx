import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
          <h4>{t('solutions.overview')}</h4>
          <p>{renderTextWithBold(solution.overview)}</p>
        </div>

        <div className="features">
          <h4>{t('solutions.key_features')}</h4>
          <div className="features-grid">
            {solution.keyFeatures && solution.keyFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-type feature-${feature.type}`}>
                  {t(`solutions.feature_types.${feature.type}`, { defaultValue: feature.type })}
                </div>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="strengths">
          <h4>{t('solutions.strengths')}</h4>
          <p>{renderTextWithBold(solution.strengths)}</p>
        </div>

        <div className="workflow">
          <h4>{t('solutions.workflow')}</h4>
          <img src={solution.workflow} alt={`${solution.title} ${t('solutions.workflow')}`} className="workflow-diagram" />
        </div>
        
        <div className="catchy-phrase">
          <p>{renderTextWithBold(solution.catchyPhrase)}</p>
        </div>
      </div>
    </section>
  );
});

export default SolutionCard;
