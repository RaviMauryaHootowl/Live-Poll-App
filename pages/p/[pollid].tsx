import {useState, useEffect} from 'react';
import styles from '../../styles/ViewPoll.module.css';
import { useRouter } from 'next/router';

const ViewPoll = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pollid } = router.query;
  const [isVoted, setIsVoted] = useState<boolean>(false);

  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [totalVote, setTotalVote] = useState<number>(0);


  const setVote = (voteIndex) => {
    const requestOptions = {
      method: 'GET'
    };
    fetch(`/api/addvote?q=${pollid}&option=${voteIndex+1}`, requestOptions)
    .then(res => res.json())
    .then(data => {
      setIsVoted(true);
      setSelectedIndex(voteIndex);
      setDataAfterFetch(data);
      localStorage.setItem(`${pollid}`, voteIndex);
    })
  }

  useEffect(() => {
    if(pollid){
      setIsLoading(true);
      console.log(pollid);
      const requestOptions = {
        method: 'GET'
      };
      fetch(`/api/getpoll?q=${pollid}`, requestOptions)
      .then(res => res.json())
      .then(data => {
        setDataAfterFetch(data);
        if(localStorage.getItem(`${pollid}`)){
          setIsVoted(true);
          setSelectedIndex(parseInt(localStorage.getItem(`${pollid}`)));
        }
        setIsLoading(false);
      }).catch((error) => {
        alert("This poll doesn't exists.");
      })
    }
  }, [pollid]);


  const setDataAfterFetch = (data) => {
    console.log(data);
    setQuestion(data['question'])
    const allOptionsObject = data['options'];
    let allOptionsArray = [];
    let totalVotes = 0;
    for(let i = 0; i < Object.keys(allOptionsObject).length; i++){
      allOptionsArray.push(allOptionsObject[`${i+1}`]);
      totalVotes += allOptionsObject[`${i+1}`]['votings'].length;
    }
    setTotalVote(totalVotes);
    for(let i = 0; i < allOptionsArray.length; i++){
      allOptionsArray[i]['percent'] = (allOptionsArray[i]['votings'].length / totalVotes * 100);
      console.log(allOptionsArray[i]['percent']);
    }
    setOptions(allOptionsArray);
  }

  return (
    <div className={styles.pollCardContainer}>
      <div className={styles.pollCard}>
        <span className={styles.cardTitle}>Quick Polls</span>
        {
          (!isLoading) ? 
          <div>
            <div className={styles.cardQuestion}>
              <span className={styles.cardQuestionSpan}>{question}</span>
            </div>

            {
              options.map((_, index) => {
                return <OptionBarView key={index} index={index} selectedIndex={selectedIndex} optionName={options[index]} isVoted={isVoted} setVote={setVote}/>
              })
            }
            {/* <div className={styles.createPollActions}>
              <div onClick={addOptionBtn} className={styles.optionAddBtn}>+</div>
              <button onClick={createPoll} className={styles.createBtn}>Create</button>
            </div> */}
            <div className={styles.pollStatus}>
              <span className={styles.totalVoteCount}>Total {totalVote} votes</span>
            </div>
          </div>
           : <div className={styles.spinnerContainer}>
             <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
           </div>
        }
      </div>
    </div>
  );
}

const OptionBarView = ({optionName, index, selectedIndex,  isVoted, setVote}) => {

  const optionBarFillStyle = {
    width : `${(isVoted) ? optionName['percent'] : 0}%`,
    backgroundColor : (index==selectedIndex) ? "#1ECE30" : "#c5c5c5"
  };

  return (
    <div onClick={() => {
        if(!isVoted){setVote(index)}
      }} className={styles.optionBarViewContainer}>
        <div style={optionBarFillStyle} className={styles.optionBarFill}></div>
        <div className={styles.optionBarContents}>
          <span className={styles.optionNameText}>{optionName['optionName']}</span>
          {(isVoted) ? <span className={styles.optionVotesCountText}>{optionName['votings'].length}</span> : <span>?</span>}
        </div>
    </div>
  );
}

export default ViewPoll;