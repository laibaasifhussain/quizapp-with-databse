import {useState, useEffect} from "react";
import {fbAdd, fbGet} from '../config/firebasemethods';

export default function Admin(){
    const [quizModel, setQuizModel] = useState({});
    const [questionModel, setQuestionModel] = useState({});
    const [option, setoption] = useState("");
    const [optionList, setoptionList] = useState([]);
    const [islock, setIsLock] = useState(false);
    const [correctOption, setCorrectOption] = useState();
    const [questions, setQuestions] = useState([]);
    const [allQuiz, setAllQuiz] = useState([])

    const addOption =()=>{
        optionList.push(option);
        setoptionList([...optionList]);
    };

    const fillQuizModel = (key, val) =>{
        quizModel[key]=val;
        setQuizModel({...quizModel});
    };

    const fillQuestionModel = (key,val)=>{
        questionModel[key]=val;
        setQuestionModel({...questionModel});
    }

    const lockQuiz = () => {
        setIsLock(!islock);
    };

    const addQuestion = () =>{
        questionModel.options =[...optionList];
        questionModel.correctAns = correctOption;
        questions.push(questionModel);
        setQuestions([...questions]);
        fillQuestionModel('question',"");
        setCorrectOption("");
        setoption('');
        setoptionList([]);
    };

    const getQuiz = ()=>{
        fbGet('quiz').then((res)=>{
            console.log(res);
        }).catch((err)=> {
            console.log(err);
            setAllQuiz([...res]);
        })
    };
    const saveQuiz = ()=>{
        quizModel.questions = {...questions};
        // console.log(quizModel);
        fbAdd('quiz',quizModel)
        .then((res)=>{
            console.log(res);
            getQuiz();
        }).catch((err)=>{
            console.log(err);
        });
    };

    const getQuizdata = ()=>{
        fbGet('quiz')
        .then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
    }
    const logout = () => {
        
      };

    useEffect=(()=>{
       getQuizdata();
    },[])
    return(
      <>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-md-2 bg-dark min-vh-100">
            <div className="p-2">
              <div className="text-center p-2">
                <img
                  width={100}
                  height={100}
                  className="rounded-pill"
                  src="https://tse1.mm.bing.net/th?id=OIP.a4j1Yw_3Y5LoPivF9sm-2wHaEK&pid=Api&P=0&h=220"
                  alt=""
                />
              </div>
              <div className="text-center">
                <button onClick={logout} className="btn btn-danger">
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-10">
            <div className="d-flex justify-content-between align-items-center p-2">
              <h3>Quiz App</h3>
              <button onClick={saveQuiz} className="btn btn-primary">
                Save Quiz
              </button>
            </div>
            <div className="p-2">
              <div className="row">
                <div className="col-md-4">
                  <div className="p-2">
                    <input
                      disabled={islock}
                      className="form-control"
                      placeholder="Question"
                      value={quizModel.question || ""}
                      onChange={(e) => fillQuizModel("question", e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-2">
                    <input
                      disabled={islock}
                      className="form-control"
                      placeholder="Duration"
                      value={quizModel.duration || ""}
                      onChange={(e) => fillQuizModel("duration", e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-2">
                    <input
                      disabled={islock}
                      className="form-control"
                      placeholder="Secret Key"
                      value={quizModel.secretKey || ""}
                      onChange={(e) => fillQuizModel("secretKey", e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                <div className="p-2">
                <label className="p-2">
                    <input
                    disabled={islock}
                    type="radio"
                    className="form-check-input p-2"
                    value="Quiz Open"
                    checked={quizModel.quizopen === "Quiz Open"}
                    onChange={(e) => fillQuizModel("quizopen", e.target.value)}
                    />
                    Quiz Open
                </label>
                </div>
                </div>
                <div className="col-md-8">
                  <div className="p-2">
                    <input
                      disabled={islock}
                      className="form-control"
                      placeholder="Description"
                      value={quizModel.description || ""}
                      onChange={(e) => fillQuizModel("description", e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-2">
                    <button onClick={lockQuiz} className="btn btn-danger">
                      {islock ? "Unlock" : "Lock"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="m-5"></div>
              <div className="row">
                <div className="col-md-12">
                  <div className="p-2">
                    <input
                      className="form-control"
                      placeholder="Question"
                      value={questionModel.question || ""}
                      onChange={(e) => fillQuestionModel("question", e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10">
                  <div className="p-2">
                    <input
                      className="form-control"
                      placeholder="Option"
                      value={option}
                      onChange={(e) => setoption('option',e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="p-2">
                    <button onClick={addOption} className="btn btn-primary">
                      Add Option
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="p-2">
                    <select
                      className="form-select"
                      value={correctOption}
                      onChange={(e) => setCorrectOption('correctOption',e.target.value)}
                    >
                      <option value="">Select Correct Option</option>
                      {optionList.map((opt, index) => (
                        <option key={index} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="p-2">
                    <button onClick={addQuestion} className="btn btn-success">
                      Add Question
                    </button>
                  </div>
                </div>
              </div>
              {questions.map((q, index) => (
                <div key={index} className="row">
                  <div className="col-md-12">
                    <div className="p-2">
                      <div>
                        <strong>Question:</strong> {q.question}
                      </div>
                      <div>
                        <strong>Options:</strong> {q.options.join(", ")}
                      </div>
                      <div>
                        <strong>Correct Answer:</strong> {q.correctAns}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     </>
    );
}
