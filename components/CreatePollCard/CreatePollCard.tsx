import Link from 'next/link';
import {useEffect, useState} from 'react';
import styles from '../../styles/CreatePollCard.module.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const CreatePollCard = () => {
  const [question, setQuestion] = useState<string> ("");
  const [options, setOptions] = useState(["", ""]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [fetchedLink, setFetchedLink] = useState<string>("");

  // set all options in the parent component
  const callBackSet = (key, newVal) => {
    const oldArr = [...options];
    oldArr[key] = newVal;
    setOptions(oldArr);
  }

  const addOptionBtn = () => {
    setOptions(options => [...options, ""]);
  }

  const createPoll = () => {
    if(isCreating) return;
    setIsCreating(true);
    let formattedOptions = {};
    options.map((_, index) => {
      formattedOptions[`${index+1}`] = {
        optionName : options[index],
        votings: []
      };
    })
    let poll = {
      question : question,
      options : formattedOptions
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poll)
    };
    fetch("/api/createpoll", requestOptions)
    .then(res => res.json())
    .then(data => { 
      //console.log(data.result);
      setFetchedLink(`${data.result._id}`)
      setIsCreating(false);
    }).catch((error) => {
      alert(error);
    });
  }

  return (
    <div className={styles.createPollPage}>
      <div className={styles.createCard}>
        <span className={styles.cardTitle}>Quick Polls</span>
        <div className={styles.cardQuestion}>
          <input value={question} onChange={(e) => {setQuestion(e.target.value)}} className={styles.cardQuestionInput} placeholder="Enter your Question" type="text" name="question" id=""/>
        </div>

        {
          options.map((_, index) => {
            return <OptionBar key={index} index={index} callBackSet={callBackSet} />
          })
        }
        <div className={styles.createPollActions}>
          <div onClick={addOptionBtn} className={styles.optionAddBtn}>+</div>
          {
            (fetchedLink == "") ? <button onClick={createPoll} className={styles.createBtn}>
              {(isCreating) ? 
                <div className={styles.spinnerContainer}>
                  <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
                </div>
                : 'Create'
              }
            </button>
            : <Link href={`/p/${fetchedLink}`}><button className={styles.viewPollBtn}>View Poll</button></Link>
          }
        </div>
        
      </div>
      
      {(fetchedLink != "") ? <div className={styles.linkOuterContainer}>
        <div className={styles.shareCopyButtonContainer}>
          <span>Shareable Link</span>
          <CopyToClipboard text={fetchedLink}>
            <button className={styles.copyBtn}>Copy</button>
          </CopyToClipboard>
          
        </div>
        
        <div className={styles.linkInnerContainer}>{`localhost:3000/p/${fetchedLink}`}</div>
      </div> : <div></div>}

    </div>
    
  );
}

const OptionBar = ({callBackSet, index}) => {
  const [optionVal, setOptionVal] = useState<string>("");

  useEffect(()=>{
    callBackSet(index, optionVal);
  }, [optionVal])

  return (
    
      <div className={styles.cardOption}>
        <div className={styles.optionCircle}></div>
        <div className={styles.cardOptionContainer}>
          <input value={optionVal} onChange={(e) => {
            setOptionVal(e.target.value);
          }} className={styles.cardOptionInput} placeholder={`Option ${index + 1}`} type="text" name="option" id=""/>
        </div>
      </div>
    
  );
}

export default CreatePollCard;