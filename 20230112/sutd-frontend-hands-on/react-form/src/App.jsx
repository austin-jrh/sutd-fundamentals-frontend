import "./App.css";
import { object, string, date } from "yup";
import { useState } from "react";
import { questions } from "./Questions";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MultiStepProgressBar } from "./components/MultiStepProgressBar";
import { MultiStepForm } from "./components/MultiStepForm";

// for matching
const USERREGEX = /^[A-Za-z0-9_]+$/;
const POSTALCODEREGEX = /^[0-9]{6}$/;

const usernameAndPassword = object().shape({
  username: string()
    .required("Username is required")
    .min(8, "Username must be at least 8 characters long")
    .matches(
      USERREGEX,
      "Username can only contain alphanumeric charaters and underscores"
    ),
  password: string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[\d]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});

const others = object().shape({
  postalcode: string()
    .required()
    .matches(
      POSTALCODEREGEX,
      "Postal code must only be comprised of 6 digits only"
    ),
  state: string().required("Please select your state."),
  email: string().email(),
  website: string().url(),
  createdOn: date().default(function () {
    return new Date();
  }),
});

function App() {
  const totalPagesCount = questions?.length || 0;
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [pagesAnswers, setPagesAnswers] = useState({});

  const [validated, setValidated] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // submission callback
  const onSubmit = (e) => {
    e.preventDefault();
    switch (index) {
      case 1:
        usernameAndPassword
          .validate(pagesAnswers[index], { abortEarly: false })
          .then((responseData) => {
            console.log(
              "🚀 ~ file: App.jsx:56 ~ onSubmit ~ responseData",
              responseData
            );
            goToNextPage();
          })
          .catch((err) => {
            console.log("🚀 ~ file: App.jsx:54 ~ onSubmit ~ err", err.errors);
            setValidated(false);
            setErrorMessage(err.errors.join("\r\n"));
          });
        break;
      case 2:
        others
          .validate(pagesAnswers[index], { abortEarly: false })
          .then((responseData) => {
            console.log(
              "🚀 ~ file: App.jsx:78 ~ .then ~ responseData",
              responseData
            );
            goToNextPage();
          })
          .catch((err) => {
            console.log("🚀 ~ file: App.jsx:82 ~ onSubmit ~ err", err.errors);
            setValidated(false);
            setErrorMessage(err.errors.join("\r\n"));
          });
        break;
      default:
        console.log("No more validation required");
        goToNextPage();
    }
  };

  const goToNextPage = () => {
    setValidated(true);
    if (index - 3) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      window.alert(JSON.stringify(pagesAnswers));
      //clear form on submit
      setPagesAnswers({});
      setSubmitted(true);
    }
  };

  // previous button callback
  const prevButton = () => {
    if (index > 1) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  // restart the submission
  const handleStart = () => {
    setIndex(1);
    setSubmitted(false);
  };

  // setup the answer state in the controlled form
  const onPageUpdate = (step, answerObj) => {
    setPagesAnswers({
      ...pagesAnswers,
      [step]: {
        ...pagesAnswers[step],
        ...answerObj,
      },
    });
  };

  return (
    <main className="App">
      <Container className="h-100">
        <Row className="m-5">
          <Col className="align-self-center">
            <MultiStepProgressBar step={index} />
          </Col>
        </Row>

        <Row className="m-5">
          <Col className="align-self-center">
            {!validated && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </Col>
        </Row>

        <Form onSubmit={onSubmit}>
          <Card>
            {submitted ? (
              <Card.Body>
                <p>Your answers have been submitted!</p>
              </Card.Body>
            ) : (
              <Card.Body>
                <MultiStepForm
                  list={questions}
                  step={index}
                  onPageUpdate={onPageUpdate}
                  pagesAnswers={pagesAnswers}
                />
              </Card.Body>
            )}

            {submitted ? (
              <Card.Footer>
                <Button onClick={handleStart}>Start Over</Button>
              </Card.Footer>
            ) : (
              <Card.Footer className="d-flex justify-content-between">
                <Button onClick={prevButton} disabled={index == 1}>
                  Previous
                </Button>
                <Button type="submit">
                  {index === totalPagesCount ? "Submit" : "Next"}
                </Button>
              </Card.Footer>
            )}
          </Card>
        </Form>
      </Container>
    </main>
  );
}

export default App;
