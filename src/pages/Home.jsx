// Home.jsx

import featuresItemsData from '../data/FeaturesItemData.json';

const Home = () => {
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {featuresItemsData.map((feature) => (
          <div className="feature-item" key={feature.id}>
            <img 
              src={`/img/${feature.image}`} 
              alt={feature.descriptionImage} 
              className="feature-icon"
            />
            <h3 className="feature-item-title">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
