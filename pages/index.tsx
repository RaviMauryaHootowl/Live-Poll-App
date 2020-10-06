
import CreatePollCard from '../components/CreatePollCard/CreatePollCard';
import styles from '../styles/Home.module.css';

const Index = () => {
  return (
    <div>
      
      <div className={styles.outerContainer}>
        <CreatePollCard />
      </div>
    </div>
    
  );
}

export default Index;