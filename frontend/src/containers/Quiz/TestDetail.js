import React,{ useEffect,useState }  from 'react'
import "./TestDetail.scss"
import Header from "../../components/Header"
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { submit } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import Alert from '../../components/Alert';
const TestDetail = ({ match,history }) => {
    const dispatch = useDispatch()
    const [result,setResult] = useState([])
    const [test,setTest] = useState({
        questions:[]
    })
    useEffect(()=>{
        const getTest = async() =>{
            const config = {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }
            const result = await axios.get(`http://localhost:8000/api/test/${match.params.slug}/`,config)
            if(result.data){
                setTest(result.data);
            }else{
                dispatch(setAlert("You have already submitted this this test"))
                return <Redirect to="/"/>
            }

        }
        getTest()
    },[match,dispatch])

    const onChange =e=>{
        setResult({...result,[e.target.name]:e.target.value});
    }

    const onSubmit = e=>{
        e.preventDefault();
        if(Object.keys(result).length === test.questions.length){
            dispatch(submit(result,test.slug))
            dispatch(setAlert("Successfully submitted the test. Go to profile to see results","success"));
            history.push("/")
        }else{
            window.scrollTo({
                top:0,
                behavior:"smooth"
            });
            dispatch(setAlert("Complete all questions before submitting","message"))
        }
    }

    const getQuestions = () =>{
        let list = [];
        let listResult = [];
        test.questions.map((question,i)=>{
            return list.push(
            <div key={question.id} className="test--content-row-card">
                <div className="image">
                    {question.image ? <img width="300" height="200" src={`http://localhost:8000`+question.image} alt="Question"/> : null}
                </div>
                <h2>{i+1}. {question.question}</h2>
                <h4>Marks:- {question.marks}</h4>
                <form className="test--content-row-card-options">

                    <div>
                        <input required onChange={e=>onChange(e)} name={`${question.question}`} id={`A-${question.id}`} type="radio" value="A"/>
                        <label  className="radio-label" htmlFor={`A-${question.id}`}>{question.option_a}</label>
                    </div>

                    <div>
                        <input  required onChange={e=>onChange(e)} name={`${question.question}`} id={`B-${question.id}`} type="radio" value="B"/>
                        <label className="radio-label" htmlFor={`B-${question.id}`} >{question.option_b}</label>
                    </div>

                    <div>
                        <input required onChange={e=>onChange(e)} name={`${question.question}`} id={`C-${question.id}`}  type="radio" value="C"/>
                        <label className="radio-label" htmlFor={`C-${question.id}`}>{question.option_c}</label>
                    </div>
                    <div>
                        <input required onChange={e=>onChange(e)} name={`${question.question}`} id={`D-${question.id}`}  type="radio" value="D"/>
                        <label className="radio-label" htmlFor={`D-${question.id}`} >{question.option_d}</label>
                    </div>
                    
                </form>
            </div>
        )})

        for(let i=0; i < list.length; i += 2){
            listResult.push(
                <div className="test--content-row">
                    <div>
                        {list[i]}
                    </div>
                    <div>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }
        return listResult
    }
    return (
        <div className="test">
            <Header title={`${test.name}`}/>
                <Alert className="alertMessageTest"/>
            <h1>{test.name}</h1>
            <h5>Published By :-{test.user}</h5>
            <p>Total Marks :-{test.total_marks}</p>

            <form onSubmit={e=>onSubmit(e)} className="test--content">
                {getQuestions()}
                <button className="button">Submit Your Test</button>
            </form>
        </div>
    )
}

export default TestDetail
